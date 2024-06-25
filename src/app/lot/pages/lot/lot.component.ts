import { PagedResultDto } from '@abp/ng.core';
import {
    ChangeDetectionStrategy,
    Component,
    ViewChild,
    type OnInit,
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
import { ResultLotService } from 'src/app/proxy/washyn/unaj/lot/services';
import { AbpUtilService } from '../../utils/abp-util.service';
import { ReportService } from 'src/app/proxy/washyn/unaj/lot/controllers';
import { RandomChoiserComponent } from '../components/random-choiser/random-choiser.component';


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

    constructor(
        public docenteService: DocenteService,
        public selectService: SelectService,
        public lotService: ResultLotService,
        public util: AbpUtilService,
        public reportService: ReportService,
        public formBuilder: FormBuilder
    ) {
        this.formLot = this.formBuilder.group<RolRegister>({
            rol: new FormControl<LookupDto<string>>(null, [
                Validators.required,
            ]),
        });
    }

    ngOnInit(): void {
        this.loadRoles();
        this.loadDocentesSorteadosYFaltantes();
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

    loadRoles() {
        this.selectService.getRol().subscribe((res) => {
            this.roles = res;
        });
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

    filter(event: AutoCompleteCompleteEvent) {
        const filtered: DocenteWithLookup[] = [];
        const query = event.query;
        for (let i = 0; i < this.allTeachers.length; i++) {
            const docentee = this.allTeachers[i];
            if (docentee.fullName.toLowerCase().includes(query.toLowerCase())) {
                filtered.push(docentee);
            }
        }

        this.filteredDocentes = filtered;
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
