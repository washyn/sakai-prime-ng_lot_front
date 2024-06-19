import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import {
    Area,
    DocenteDto,
    Gender,
} from '../../../proxy/acme/book-store/entities';
import {
    AsignComisionDto,
    ComisionDto,
    ComisionService,
    DocenteLookup,
} from '../../../proxy/washyn/unaj/lot/services';
import { AbpUtilService } from '../../utils/abp-util.service';
import { PagedResultDto } from '@abp/ng.core';

@Component({
    selector: 'app-assignment',
    templateUrl: './assignment.component.html',
    styleUrl: './assignment.component.scss',
})
export class AssignmentComponent implements OnInit {
    modalComision: boolean = false;

    formComision: FormGroup;
    selectedComision: ComisionDto = {} as ComisionDto;

    constructor(
        public formBuilder: FormBuilder,
        public comisionService: ComisionService,
        public util: AbpUtilService
    ) {}

    ngOnInit(): void {
        this.buildFormComision();
        this.listDataComision();
    }

    saveFormComision() {
        if (this.formComision.invalid) {
            this.util.notify.error(
                'Asegurese de llenar todos los datos del formulario.',
                'Mensaje de validación'
            );
            return;
        }

        const request = this.selectedComision.id
            ? this.comisionService.update(this.selectedComision.id, {
                  ...this.formComision.value,
              })
            : this.comisionService.create({
                  ...this.formComision.value,
              });

        request.subscribe(() => {
            this.modalComision = false;
            this.formComision.reset();
            this.listDataComision();
        });
    }

    comisiones = {
        items: [],
        totalCount: 0,
    } as PagedResultDto<ComisionDto>;

    listDataComision() {
        this.comisionService
            .getList({
                maxResultCount: 100,
            })
            .subscribe((res) => {
                this.comisiones = res;
            });
    }

    createComisionModal() {
        this.selectedComision = {} as ComisionDto;
        this.buildFormComision();
        this.modalComision = true;
    }

    buildFormComision() {
        this.formComision = this.formBuilder.group<{
            nombre: FormControl<string>;
        }>({
            nombre: new FormControl<string>(
                this.selectedComision.nombre || '',
                [Validators.required, Validators.maxLength(100)]
            ),
        });
    }
}
