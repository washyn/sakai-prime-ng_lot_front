import { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { TableLazyLoadEvent } from 'primeng/table';
import { ExcelTemplateService } from 'src/app/proxy/acme/book-store/controllers';
import {
    Area,
    CreateUpdateDocenteDto,
    DocenteDto,
    DocenteFilter,
    Gender,
} from 'src/app/proxy/acme/book-store/entities';
import {
    DocenteService,
    SelectService,
} from 'src/app/proxy/acme/book-store/services';
import { ReportService } from 'src/app/proxy/washyn/unaj/lot/controllers';
import { LookupDto } from 'src/app/proxy/washyn/unaj/lot/models';
import { AbpUtilService } from '../../utils/abp-util.service';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
    tableFilterModel = {
        maxResultCount: 15,
    } as DocenteFilter;
    data: PagedResultDto<DocenteDto> = { items: [], totalCount: 0 };
    formGroup: FormGroup;
    formFilter: FormGroup;
    selectedDocente: DocenteDto = {} as DocenteDto;
    isModalOpen = false;
    grados: LookupDto<string>[] = [];
    titleModal = '';

    constructor(
        public selectService: SelectService,
        public docenteService: DocenteService,
        public reporteService: ReportService,
        public util: AbpUtilService,
        public excelTemplate: ExcelTemplateService,
        public formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.selectService.getGrado().subscribe((res) => {
            this.grados = res;
        });
        this.listData();
        this.buildForm();
        this.formFilter = this.formBuilder.group<{
            filter: FormControl<string>;
        }>({
            filter: new FormControl<string>(''),
        });

        this.formFilter
            .get('filter')
            .valueChanges.pipe(debounceTime(300))
            .subscribe((value: string | null) => {
                this.tableFilterModel = {
                    ...this.tableFilterModel,
                    filter: value,
                };
                this.listData();
            });
    }

    listData() {
        this.docenteService.getList(this.tableFilterModel).subscribe((res) => {
            this.data = res;
        });
    }

    tableLazyLoad(event: TableLazyLoadEvent) {
        this.tableFilterModel = {
            ...this.tableFilterModel,
            maxResultCount: event.rows ?? this.tableFilterModel.maxResultCount,
            skipCount: event.first,
        };
        this.listData();
    }

    downloadTemplateFile() {
        this.excelTemplate.getFileTemplate().subscribe((blob) => {
            this.util.saveBlobToFile(blob, 'Plantilla sorteo docentes.xlsx');
        });
    }

    buildForm() {
        this.formGroup = this.formBuilder.group<{
            dni: FormControl<number>;
            nombre: FormControl<string>;
            apellidoPaterno: FormControl<string>;
            apellidoMaterno: FormControl<string>;
            gradoId: FormControl<string>;
            genero: FormControl<Gender>;
            area?: FormControl<Area>;
        }>(
            {
                dni: new FormControl<number>(
                    +this.selectedDocente.dni || null,
                    [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(8),
                    ]
                ),
                nombre: new FormControl<string>(
                    this.selectedDocente.nombre || '',
                    [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(100),
                    ]
                ),
                apellidoPaterno: new FormControl<string>(
                    this.selectedDocente.apellidoPaterno || '',
                    [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(100),
                    ]
                ),
                apellidoMaterno: new FormControl<string>(
                    this.selectedDocente.apellidoMaterno || '',
                    [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(100),
                    ]
                ),
                gradoId: new FormControl<string>(
                    this.selectedDocente.gradoId || '',
                    [Validators.required]
                ),
                genero: new FormControl<Gender>(
                    this.selectedDocente.genero || null,
                    [Validators.required]
                ),
                area: new FormControl<Area>(
                    this.selectedDocente.area || null,
                    []
                ),
            },
            {
                updateOn: 'blur',
            }
        );
    }

    save() {
        // this.form.ngSubmit.emit();
        console.log('send');
        if (this.formGroup.invalid) {
            this.util.notify.error(
                'Asegurese de llenar todos los datos del formulario.',
                'Mensaje de validación'
            );
            return;
        }

        const request = this.selectedDocente.id
            ? this.docenteService.update(this.selectedDocente.id, {
                  ...this.formGroup.value,
                  dni: this.formGroup.value.dni.toString(),
              })
            : this.docenteService.create({
                  ...this.formGroup.value,
                  dni: this.formGroup.value.dni.toString(),
              });

        request.subscribe(() => {
            this.isModalOpen = false;
            this.formGroup.reset();
            this.listData();
        });
    }

    createModal() {
        this.titleModal = 'Registrar nuevo docente';
        this.selectedDocente = {} as DocenteDto;
        this.buildForm();
        this.isModalOpen = true;
    }

    editModal(id: string) {
        this.titleModal = 'Modificar datos';
        this.docenteService.get(id).subscribe((docente) => {
            this.selectedDocente = docente;
            this.buildForm();
            this.isModalOpen = true;
        });
    }

    delete(id: string) {
        this.util.message.confirm(
            'Esta seguro de eliminar esto?',
            'Esta seguro',
            (res) => {
                if (res) {
                    this.docenteService.delete(id).subscribe(() => {
                        this.listData();
                        this.util.notify.info('Se elimino el registro.');
                    });
                }
            }
        );
    }
}
