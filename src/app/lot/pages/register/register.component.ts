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
    CreateUpdateDocenteDto,
    Gender,
} from 'src/app/proxy/acme/book-store/entities';
import {
    DocenteService,
    SelectService,
} from 'src/app/proxy/acme/book-store/services';
import { LookupDto } from 'src/app/proxy/washyn/unaj/lot';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
    model: CreateUpdateDocenteDto;
    formGroup: FormGroup;
    grados: LookupDto<string>[] = [];

    constructor(
        public selectService: SelectService,
        public formBuilder: FormBuilder,
        public docenteService: DocenteService
    ) {}
    ngOnInit(): void {
        this.selectService.getGrado().subscribe((res) => {
            this.grados = res;
        });
        this.buildForm();
    }

    buildForm() {
        this.formGroup = this.formBuilder.group<{
            nombre: FormControl<string>;
            apellidoPaterno: FormControl<string>;
            apellidoMaterno: FormControl<string>;
            gradoId: FormControl<string>;
            genero: FormControl<Gender>;
        }>({
            nombre: new FormControl<string>('', [Validators.required]),
            apellidoPaterno: new FormControl<string>('', [Validators.required]),
            apellidoMaterno: new FormControl<string>('', [Validators.required]),
            gradoId: new FormControl<string>('', [Validators.required]),
            genero: new FormControl<Gender>(Gender.Unknow, [
                Validators.required,
            ]),
        });
    }

    save() {
        this.docenteService
            .create({
                ...this.formGroup.value,
            } as CreateUpdateDocenteDto)
            .subscribe(() => {});
    }
}
