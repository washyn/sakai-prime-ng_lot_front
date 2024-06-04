import { Component, OnInit } from '@angular/core';
import {
    ProductoDto,
    ProductoService,
} from '../../../../proxy/washyn/sales/services';
import { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CurrencyPipe, NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-crud-abp',
    standalone: true,
    imports: [
        CardModule,
        TableModule,
        RippleModule,
        ButtonModule,
        CurrencyPipe,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        ReactiveFormsModule,
        NgIf,
        DropdownModule,
        InputNumberModule,
        RadioButtonModule,
        CalendarModule,
        ToastModule,
        ConfirmDialogModule,
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './crud-abp.component.html',
    styleUrl: './crud-abp.component.scss',
})
export class CrudAbpComponent implements OnInit {
    data = {
        totalCount: 0,
        items: [],
    } as PagedResultDto<ProductoDto>;

    form: FormGroup;
    isModalOpen = false;
    selected = {} as ProductoDto;

    first = 0;
    rows = 10;

    // TODO: create folder module for utils...
    constructor(
        private service: ProductoService,
        private formBuilder: FormBuilder
    ) {}

    buildForm() {
        this.form = this.formBuilder.group({
            codigo: [this.selected.codigo || null],
            nombre: [this.selected.nombre || '', Validators.required],
            descripcion: [this.selected.descripcion || null],
            observacion: [this.selected.observacion || null],
            precio: [
                this.selected.precio || null,
                [Validators.required, Validators.min(0), Validators.max(10000)],
            ],
            cantidadStock: [
                this.selected.cantidadStock || null,
                [Validators.min(0), Validators.max(100000)],
            ],
            expires: [
                this.selected.expires ? new Date(this.selected.expires) : null,
                [],
            ],
        });
    }

    ngOnInit(): void {
        const productStreamCreator = (query) => this.service.getList(query);

        // TODO: agregar ordenamiento y paginacion
        // TODO: implementar el servicio de listado, e implementar el paginado ver como lo hace prime

        // create injector for list service
        // this.listService.hookToQuery(productStreamCreator).subscribe((res)=>{
        //     this.data = res;
        // })

        this.service
            .getList({
                maxResultCount: 1000,
            } as PagedAndSortedResultRequestDto)
            .subscribe((res) => {
                this.data = res;
            });
    }

    editProduct(product: ProductoDto) {
        this.service.get(product.id).subscribe((res) => {
            this.selected = res;
            this.buildForm();
            this.isModalOpen = true;
        });
    }

    deleteProduct(product: ProductoDto) {
        // this.util.message.confirm(
        //     'Esta seguro de eliminar esto.',
        //     'Esta seguro?',
        //     (confimed) => {
        //         if (confimed) {
        //             this.service.delete(product.id).subscribe(() => {
        //                 // this.listService.get();
        //                 this.util.notify.success('El producto fue eliminado.');
        //             });
        //         }
        //     }
        // );
    }

    registrarNuevo() {
        this.selected = {} as ProductoDto;
        this.buildForm();
        this.isModalOpen = true;
    }

    save() {
        if (this.form.invalid) {
            return;
        }
        const req = this.selected.id
            ? this.service.update(this.selected.id, this.form.value)
            : this.service.create(this.form.value);

        req.subscribe(() => {
            this.isModalOpen = false;
            this.form.reset();
            // this.listService.get();
        });
    }

    pageChange(event: TablePageEvent) {
        this.rows = event.rows;
        this.first = event.first;
    }
}
