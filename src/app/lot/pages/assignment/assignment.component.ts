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
    ComisionDto,
    ComisionService,
    ComisionWithRoles,
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
    formRol: FormGroup;
    selectedComision: ComisionDto = {} as ComisionDto;
    modalRol: boolean = false;
    modalComisionTitle = '';
    selectedComisionId: string = '';
    constructor(
        public formBuilder: FormBuilder,
        public comisionService: ComisionService,
        public util: AbpUtilService
    ) {}

    ngOnInit(): void {
        this.buildRolForm();
        this.buildFormComision();
        this.listDataComision();
    }

    buildRolForm() {
        this.formRol = this.formBuilder.group<{
            nombre: FormControl<string>;
        }>({
            nombre: new FormControl('', [
                Validators.required,
                Validators.maxLength(50),
            ]),
        });
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

    saveFormRole() {
        if (this.formRol.invalid) {
            this.util.notify.error(
                'Asegurese de llenar todos los datos del formulario.',
                'Mensaje de validación'
            );
            return;
        }

        const reqObservable = this.comisionService.addRolByModel({
            ...this.formRol.value,
            comisionId: this.selectedComisionId,
        });

        reqObservable.subscribe(() => {
            this.modalRol = false;
            this.formRol.reset();
            this.selectedComisionId = '';
            this.listDataComision();
        });
    }

    comisiones: ComisionWithRoles[] = [];

    // Get comisiones y roles...
    // get with details ...
    listDataComision() {
        this.comisionService.getAllWithDetails().subscribe((res) => {
            this.comisiones = res;
        });
    }

    createComisionModal() {
        this.selectedComision = {} as ComisionDto;
        this.buildFormComision();
        this.modalComision = true;
        this.modalComisionTitle = 'Registrar nueva comisión';
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

    agregarRol(comisionId: string) {
        this.selectedComisionId = comisionId;
        this.modalRol = true;
        this.buildRolForm();
    }

    editComisionModal(id: string) {
        this.comisionService.get(id).subscribe((element) => {
            this.selectedComision = element;
            this.buildFormComision();
            this.modalComisionTitle = 'Modificar nombre de comisión';
            this.modalComision = true;
        });
    }

    removerComision(item: string) {
        this.util.message.confirm(
            'Esta seguro de remover esta comisión',
            'Confirmación',
            (isConfirmed) => {
                if (isConfirmed) {
                    this.comisionService.delete(item).subscribe(() => {
                        this.util.notify.info(`Se elimino la comisión.`);
                        this.listDataComision();
                    });
                }
            }
        );
    }

    removerRol(id: string) {
        this.util.message.confirm("Esta seguro de remover este rol?","Esta seguro", (isConfirmed)=>{
            if (isConfirmed){
                this.comisionService.removeRolByRolId(id).subscribe(()=>{
                    this.listDataComision();
                });
            }
        });
    }
}
