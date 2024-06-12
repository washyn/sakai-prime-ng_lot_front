import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
            nombre: FormControl<string>;
            apellidoPaterno: FormControl<string>;
            apellidoMaterno: FormControl<string>;
            gradoId: FormControl<string>;
            genero: FormControl<Gender>;
            area?: FormControl<Area>;
        }>({
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
            genero: new FormControl<Gender>(Gender.Unknow, [
                Validators.required,
            ]),
            area: new FormControl<Area>(null, []),
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
        this.bottonDisabled = false;
        this.docenteService
            .create({
                ...this.formGroup.value,
            } as CreateUpdateDocenteDto)
            .subscribe(() => {
                this.util.message.success(
                    'Se registro correctamente.',
                    'Registro'
                );
                this.buildForm();
                this.bottonDisabled = true;
            });
    }
}
