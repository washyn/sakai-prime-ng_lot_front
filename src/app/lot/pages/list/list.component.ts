import { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { TableLazyLoadEvent } from 'primeng/table';
import { AbpUtilService } from 'src/app/demo/components/pages/utils/abp-util.service';
import { ExcelTemplateService } from 'src/app/proxy/acme/book-store/controllers';
import {
    Area,
    CreateUpdateDocenteDto,
    DocenteDto,
    Gender,
} from 'src/app/proxy/acme/book-store/entities';
import {
    DocenteService,
    SelectService,
} from 'src/app/proxy/acme/book-store/services';
import { ReportService } from 'src/app/proxy/washyn/unaj/lot/controllers';
import { LookupDto } from 'src/app/proxy/washyn/unaj/lot/models';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
    tableFilterModel = {
        maxResultCount: 15,
    } as PagedAndSortedResultRequestDto;
    data: PagedResultDto<DocenteDto> = { items: [], totalCount: 0 };
    formGroup: FormGroup;
    selectedDocente: DocenteDto = {} as DocenteDto;
    isModalOpen = false;
    grados: LookupDto<string>[] = [];

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
            this.saveBlobToFile(blob, 'Plantilla sorteo docentes.xlsx');
        });
    }

    // TODO: refact
    saveBlobToFile(blob, fileName) {
        // Create a blob URL
        const blobURL = window.URL.createObjectURL(blob);

        // Create an anchor element for the download
        const a = document.createElement('a');
        a.href = blobURL;
        a.download = fileName || 'download.dat'; // Provide a default file name if none is provided

        // Append the anchor to the document
        document.body.appendChild(a);

        // Simulate a click on the anchor to initiate the download
        a.click();

        // Clean up: remove the anchor and revoke the blob URL
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobURL);
    }

    buildForm() {
        this.formGroup = this.formBuilder.group<{
            nombre: FormControl<string>;
            apellidoPaterno: FormControl<string>;
            apellidoMaterno: FormControl<string>;
            gradoId: FormControl<string>;
            genero: FormControl<Gender>;
            area?: FormControl<Area>;
        }>({
            nombre: new FormControl<string>(this.selectedDocente.nombre || '', [
                Validators.required,
                Validators.maxLength(100),
            ]),
            apellidoPaterno: new FormControl<string>(
                this.selectedDocente.apellidoPaterno || '',
                [Validators.required, Validators.maxLength(100)]
            ),
            apellidoMaterno: new FormControl<string>(
                this.selectedDocente.apellidoMaterno || '',
                [Validators.required, Validators.maxLength(100)]
            ),
            gradoId: new FormControl<string>(
                this.selectedDocente.gradoId || '',
                [Validators.required]
            ),
            genero: new FormControl<Gender>(
                this.selectedDocente.genero || Gender.Unknow,
                [Validators.required]
            ),
            area: new FormControl<Area>(this.selectedDocente.area || null, []),
        });
    }

    save() {
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
              })
            : this.docenteService.create({ ...this.formGroup.value });

        request.subscribe(() => {
            this.isModalOpen = false;
            this.formGroup.reset();
            this.listData();
        });
    }

    createModal() {
        this.selectedDocente = {} as DocenteDto;
        this.buildForm();
        this.isModalOpen = true;
    }

    editModal(id: string) {
        this.docenteService.get(id).subscribe((docente) => {
            this.selectedDocente = docente;
            this.buildForm();
            this.isModalOpen = true;
        });
    }

    downloadPdf(docenteId: string) {
        this.reporteService
            .getSamplePdfReportById(docenteId)
            .subscribe((res) => {
                this.saveBlobToFile(res, 'Documento.pdf');
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
