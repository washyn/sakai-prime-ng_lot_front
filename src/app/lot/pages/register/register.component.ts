import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Dictionary } from '@fullcalendar/core/internal';
import {
    Area,
    CreateUpdateDocenteDto,
    Gender,
} from 'src/app/proxy/acme/book-store/entities';
import {
    DocenteService,
    SelectService,
} from 'src/app/proxy/acme/book-store/services';
import { LookupDto } from 'src/app/proxy/washyn/unaj/lot';
import { AbpUtilService } from '../../utils/abp-util.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
    model: CreateUpdateDocenteDto;
    formGroup: FormGroup;
    grados: LookupDto<string>[] = [];

    private _bottonStatus = true;

    constructor(
        public selectService: SelectService,
        public util: AbpUtilService,
        public formBuilder: FormBuilder,
        public docenteService: DocenteService
    ) {}
    ngOnInit(): void {
        this.selectService.getGrado().subscribe((res) => {
            this.grados = res;
        });
        this.buildForm();
    }

    public get bottonDisabled() {
        return this._bottonStatus;
    }

    public set bottonDisabled(status: boolean) {
        this._bottonStatus = status;
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
        }>({
            dni: new FormControl<number>(null, [
                Validators.required,
                Validators.maxLength(8),
            ]),
            nombre: new FormControl<string>('', [
                Validators.required,
                Validators.maxLength(100),
            ]),
            apellidoPaterno: new FormControl<string>('', [
                Validators.required,
                Validators.maxLength(100),
            ]),
            apellidoMaterno: new FormControl<string>('', [
                Validators.required,
                Validators.maxLength(100),
            ]),
            gradoId: new FormControl<string>('', [Validators.required]),
            genero: new FormControl<Gender>(null, [Validators.required]),
            area: new FormControl<Area>(null, []),
        }, {
            updateOn:"change"
        });
    }

    save() {
        if (this.formGroup.invalid) {
            this.util.notify.error(
                'Asegurese de llenar todos los campos requeridos del formulario.',
                'Mensaje de validación'
            );
            return;
        }

        this.docenteService
            .create({
                ...this.formGroup.value,
                dni: this.formGroup.value.dni.toString(),
            } as CreateUpdateDocenteDto)
            .subscribe(() => {
                this.util.message.success(
                    'Se registro correctamente.',
                    'Registro'
                );
                this.buildForm();
            });
    }
}
