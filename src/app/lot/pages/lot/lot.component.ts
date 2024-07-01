import { Component, type OnInit, Input } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DocenteWithLookup } from 'src/app/proxy/acme/book-store/entities';
import {
    DocenteService,
    SelectService,
} from 'src/app/proxy/acme/book-store/services';
import { LookupDto } from 'src/app/proxy/washyn/unaj/lot';
import {
    ComisionService,
    ComisionWithRoles,
    ResultLotService,
} from 'src/app/proxy/washyn/unaj/lot/services';
import { AbpUtilService } from '../../utils/abp-util.service';
import {el} from "@fullcalendar/core/internal-common";


interface RolRegister {
    rol?: FormControl<LookupDto<string>>;
}

@Component({
    selector: 'app-lot',
    templateUrl: './lot.component.html',
    styleUrls: ['./lot.component.css'],
})
export class LotComponent implements OnInit {
    filteredDocentes: DocenteWithLookup[] = [];
    allTeachers: DocenteWithLookup[] = [];
    formLot: FormGroup<RolRegister>;
    roles: LookupDto<string>[] = [];
    comisionWithRoles: ComisionWithRoles = {
        id: '',
        rols: [],
        nombre: '',
    };
    modalIntegrantes = false;

    docentesForModal: DocenteWithLookup[] = [];
    selectedDocnentes: DocenteWithLookup[] = [];

    @Input() comisionId!: string;

    constructor(
        public selectService: SelectService,
        public lotService: ResultLotService,
        public util: AbpUtilService,
        public docenteService: DocenteService,
        public comisionService: ComisionService,
        public formBuilder: FormBuilder
    ) {
        this.formLot = this.formBuilder.group<RolRegister>({
            rol: new FormControl<LookupDto<string>>(null, [
                Validators.required,
            ]),
        });
    }

    ngOnInit(): void {
        this.loadWithRoles();
        this.loadDocentesSorteadosYFaltantes();
    }

    loadDocentes() {
        this.docenteService
            .getList({
                maxResultCount: 1000,
            })
            .subscribe((res) => {
                this.docentesForModal = res.items.sort((a, b) =>
                    a.fullName.localeCompare(b.fullName)
                );
            });
    }

    showModal() {
        this.modalIntegrantes = true;
        this.loadDocentes();
        // this.selectedDocnentes = [];

        // load docentes... from backend... ...
    }

    // add func for save modal
    saveIntegrantes() {
        this.modalIntegrantes = false;

        if (!this.selectedDocnentes.length){
            this.util.notify.warn("Selecione al menos un docente para participar en el sorteo.");
            return;
        }

        this.faltantes = [...this.selectedDocnentes.map(a =>{
            return {
                ...a
            } as DocenteWithLookup
        })]

        this.fixSincronizeList();
    }

    // TODO: agregar opciopn de remover en una pagina oculta y pgaina de configuracion en interfaz de usuario...

    fixSincronizeList(){
        let tempList = this.faltantes.filter(a => {
            if (this.estaEnFaltantes(a)){
                return false;
            }else {
                return true;
            }
        })
        this.faltantes = [...tempList];
    }

    estaEnFaltantes(docente: DocenteWithLookup){
        let res = this.sorteados.some(a => a.id === docente.id);
        return res;
    }

    loadWithRoles() {
        this.comisionService
            .getWithDetailsByComisionId(this.comisionId)
            .subscribe((res) => {
                this.comisionWithRoles = res;
                this.roles = res.rols.map((rolDto) => {
                    return {
                        id: rolDto.id,
                        displayName: rolDto.nombre,
                        alternativeText: rolDto.nombre,
                    } as LookupDto<string>;
                });
            });
    }

    startLot() {
        if (!this.faltantes.length){
            this.util.notify.error(
                'Selecione al menos un docente participante.',
                'Mensaje de validación'
            );
            return;
        }
        if (this.formLot.invalid) {
            this.util.notify.error(
                'Selecione un rol para realizar el sorteo.',
                'Mensaje de validación'
            );
            return;
        }

        this.clearSelectedTag();
        setTimeout(() => {
            this.randomSelect();
        }, 100);
    }

    // Estas 2 listas deben ser distintas
    sorteados: DocenteWithLookup[] = [];
    faltantes: DocenteWithLookup[] = [];

    loadDocentesSorteadosYFaltantes() {
        this.lotService
            .getAlreadyWithLotByComisionId(this.comisionId)
            .subscribe((res) => {
                this.sorteados = res;
                this.fixSincronizeList();
            });
    }

    // TODO: crear funcion para que los sorteados no se muestren como pendientes.

    resultadoSorteo(rol: LookupDto<string>, docente: LookupDto<string>) {
        let message = `Se sorteó a ${docente.displayName} como ${rol.displayName}`;
        this.util.message.confirm(
            message,
            'Resultado de sorteo',
            (confirm) => {
                if (confirm) {
                    this.lotService
                        .createLot({
                            roleId: rol.id,
                            docenteId: docente.id,
                            comisionId: this.comisionId,
                        })
                        .subscribe(() => {
                            this.util.notify.success(
                                'Sorteo registrado.',
                                'Registrado!'
                            );
                            this.loadDocentesSorteadosYFaltantes();
                        });
                } else {
                    this.util.notify.info(
                        'Puede realizar un nuevo intento de sorteo.',
                        'Mensaje'
                    );
                }
            },
            {
                acceptLabel: 'Aceptar',
                rejectLabel: 'Rechazar',
            }
        );
    }

    //TODO: fix add role
    removeResultFromLot(docenteId: string) {
        this.util.message.confirm(
            'Esta seguro de remover este sorteo?',
            'Esta seguro?',
            (isConfirmed) => {
                if (isConfirmed) {
                    this.lotService
                        .deleteLot({
                            docenteId: docenteId,
                            comisionId: this.comisionId,
                            roleId: ""// TODO: add rol from arg...
                        })
                        .subscribe(() => {
                            this.loadDocentesSorteadosYFaltantes();
                        });
                }
            }
        );
    }

    randomSelect() {
        const times = 30;
        const interval = setInterval(() => {
            const randomTag = this.pickRandomTag();
            this.highlightTag(randomTag);
            setTimeout(() => {
                this.unhighlightTag(randomTag);
            }, 100);
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            setTimeout(() => {
                const randomTag = this.pickRandomTag();
                this.highlightTag(randomTag);

                let node = <HTMLElement>randomTag;
                let dataResultChoise = {
                    id: node.dataset['id'],
                    displayName: node.dataset['displayName'],
                    alternativeText: '',
                } as LookupDto<string>;

                setTimeout(() => {
                    this.resultadoSorteo(
                        this.formLot.value.rol,
                        dataResultChoise
                    );
                }, 500);
            }, 100);
        }, times * 100);
    }

    pickRandomTag() {
        const tags = document.querySelectorAll('.tag');
        return tags[Math.floor(Math.random() * tags.length)];
    }

    highlightTag(tag) {
        tag.classList.add('highlight');
    }

    unhighlightTag(tag) {
        tag.classList.remove('highlight');
    }

    clearSelectedTag() {
        const tags = document.querySelectorAll('.tag');
        tags.forEach((el) => {
            this.unhighlightTag(el);
        });
    }
}
