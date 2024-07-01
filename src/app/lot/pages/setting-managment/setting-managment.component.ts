import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import {
    DocenteService,
    SelectService,
} from 'src/app/proxy/acme/book-store/services';
import { AbpUtilService } from '../../utils/abp-util.service';
import { ConfiguracionService } from 'src/app/proxy/washyn/unaj/lot/services';
import { DocumentOptions } from 'src/app/proxy/washyn/unaj/lot/models/models';

interface DocumentOptionsTypeForm {
    yearName: FormControl<string>;
    numeroCarta: FormControl<string>;
    asunto: FormControl<string>;
    modalidad: FormControl<string>;
    sequenceStart: FormControl<number>;
    fechaExamen: FormControl<string>;
    despedida: FormControl<string>;
    fechaGenerada: FormControl<string>;
}

@Component({
    selector: 'app-setting-managment',
    // templateUrl: './setting-managment.component.html',
    templateUrl: './setting-managment.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingManagmentComponent implements OnInit {
    formGroup: FormGroup<DocumentOptionsTypeForm>;

    constructor(
        public selectService: SelectService,
        public util: AbpUtilService,
        public formBuilder: FormBuilder,
        public configuration: ConfiguracionService,
        public docenteService: DocenteService
    ) {}

    ngOnInit(): void {
        this.loadConfiguration();
        this.buildForm();
    }

    currentConfig: DocumentOptions = {} as DocumentOptions;

    buildForm() {
        this.formGroup = this.formBuilder.group<DocumentOptionsTypeForm>(
            {
                yearName: new FormControl('', [Validators.required]),
                numeroCarta: new FormControl('', [Validators.required]),
                asunto: new FormControl('', [Validators.required]),
                modalidad: new FormControl('', [Validators.required]),
                sequenceStart: new FormControl(1, [Validators.required]),
                fechaExamen: new FormControl('', [Validators.required]),
                despedida: new FormControl('', [Validators.required]),
                fechaGenerada: new FormControl('', [Validators.required]),
            },
            {
                updateOn: 'blur',
            }
        );
    }

    loadConfiguration() {
        this.configuration.getConfig().subscribe((res) => {
            this.currentConfig = res;
            this.formGroup.setValue({
                ...this.currentConfig,
            });
        });
    }

    save() {
        if (this.formGroup.invalid) {
            return;
        }
        this.configuration
            .createConfigByDocumentOptions({
                ...this.formGroup.value,
            } as DocumentOptions)
            .subscribe(() => {
                this.util.notify.info('Se actualizo la configuración.');
                this.loadConfiguration();
            });
    }
}
