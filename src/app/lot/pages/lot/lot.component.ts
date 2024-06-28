import {
    Component,
    type OnInit, Input,
} from '@angular/core';
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
import {ComisionService, ComisionWithRoles, ResultLotService} from 'src/app/proxy/washyn/unaj/lot/services';
import { AbpUtilService } from '../../utils/abp-util.service';


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
        id: "",
        rols: [],
        nombre: ""
    };
    modalIntegrantes = false;

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

    docentesForModal: DocenteWithLookup[] = []

    selectedDocnentes: DocenteWithLookup[] = []
    loadDocentes(){
        this.docenteService.getList({
            maxResultCount: 1000
        }).subscribe(res => {
            this.docentesForModal = res.items.sort((a,b) => a.fullName.localeCompare(b.fullName));
        });
    }

    showModal(){
        this.modalIntegrantes = true;
        this.loadDocentes();
        this.selectedDocnentes = []
        // load docentes... from backend... ...
    }

    // add func for save modal
    saveIntegrantes(){
        this.modalIntegrantes = false;
        // map fields and send to backend...
        // ...
        let identifiers:string[] = this.selectedDocnentes.map(a =>{
            return a.id;
        });
        this.comisionService.assignToComisionByComisionIdAndDocentes(this.comisionId, identifiers).subscribe(()=>{
            this.util.notify.info("Se modifico la lista de docentes de esta comision.");
            this.loadDocentesSorteadosYFaltantes();
        });
    }


    loadWithRoles(){
        this.comisionService.getWithDetailsByComisionId(this.comisionId).subscribe(res =>{
            this.comisionWithRoles = res;
            this.roles = res.rols.map(rolDto =>{
                return {
                    id: rolDto.id,
                    displayName: rolDto.nombre,
                    alternativeText: rolDto.nombre
                } as LookupDto<string>;
            });
        });
    }

    startLot() {
        if (this.formLot.invalid) {
            this.util.notify.error(
                'Selecione un rol para realizar el sorteo.',
                'Mensaje de validación'
            );
            return;
        }

        this.clearSelectedTag();
        setTimeout(()=>{
            this.randomSelect();
        },100);
    }

    sorteados: DocenteWithLookup[] = [];
    faltantes: DocenteWithLookup[] = [];

    loadDocentesSorteadosYFaltantes() {
        this.lotService.getAlreadyWithLot().subscribe((res) => {
            this.sorteados = res;
        });
        this.lotService.getWithoutLot().subscribe((res) => {
            this.faltantes = res;
            this.allTeachers = [...res];
        });
    }

    resultadoSorteo(rol: LookupDto<string>, docente: LookupDto<string>) {
        let message = `Se sorteó a ${docente.displayName} como ${rol.displayName}`;
        this.util.message.confirm(
            message,
            'Sorteo',
            (confirm) => {
                if (confirm) {
                    this.lotService
                        .createLot({
                            roleId: rol.id,
                            docenteId: docente.id,
                        })
                        .subscribe(() => {
                            this.util.notify.success(
                                'Sorteo registrado.',
                                'Registrado!'
                            );
                            // this.formLot.reset();
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

                setTimeout(()=>{
                    this.resultadoSorteo(
                        this.formLot.value.rol,
                        dataResultChoise
                    );
                },500);
            }, 100);
        }, times * 100);
    }

    removeResultFromLot(docenteId: string){
        this.util.message.confirm("Esta seguro de remover este sorteo?","Esta seguro?", (isConfirmed)=>{
            if (isConfirmed){
                this.lotService.deleteByDocenteId(docenteId).subscribe(()=>{
                    this.loadDocentesSorteadosYFaltantes();
                });
            }
        });
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
        tags.forEach(el =>{
            this.unhighlightTag(el);
        });
    }
}
