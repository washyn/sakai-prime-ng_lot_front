import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { AbpUtilService } from '../../utils/abp-util.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ErrorSampleService } from 'src/app/proxy/washyn/unaj/lot/controllers';

// NOTE:can be add methods for test, error methods withoud sleep
@Component({
    selector: 'app-samples',
    template: `
        <h2>
            {{ 'AbpUi::Login' | abpLocalization }}
        </h2>

        <button pButton (click)="util.notify.error('error', 'error')">
            error
        </button>
        <button pButton (click)="util.notify.info('info', 'info')">info</button>
        <button pButton (click)="util.notify.success('success', 'success')">
            success
        </button>
        <button pButton (click)="util.notify.warn('warn', 'warn')">warn</button>

        <hr />
        <button pButton (click)="util.message.confirm('confirm', 'confirm')">
            confirm
        </button>
        <button pButton (click)="util.message.error('error', 'error')">
            error
        </button>
        <button pButton (click)="util.message.info('info', 'info')">
            info
        </button>
        <button pButton (click)="util.message.success('success', 'success')">
            success
        </button>
        <button pButton (click)="util.message.warn('warn', 'warn')">
            warn
        </button>

        <hr />
        <button pButton (click)="block()">UI block</button>
        <hr />

        <button pButton (click)="errorTest401()">ErrorTest401</button>
        <button pButton (click)="errorTest403()">ErrorTest403</button>
        <button pButton (click)="errorTest4XX()">ErrorTest4XX</button>
        <button pButton (click)="errorTest404()">ErrorTest404</button>
        <button pButton (click)="errorTest500()">ErrorTest500</button>

        <form [formGroup]="formGroup" (ngSubmit)="submitForm()">
            <div class="field">
                <label>Nombre</label>
                <input formControlName="nombre" />
            </div>

            <button type="button" (click)="submitForm()">Submit</button>
        </form>
    `,
})
export class SamplesComponent implements OnInit {
    formGroup: FormGroup;

    constructor(
        public util: AbpUtilService,
        public errorSample: ErrorSampleService,
        public formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            nombre: new FormControl('', [Validators.required]),
        });
    }
    // https://community.abp.io/posts/global-error-handling-in-angular-gjcb2f1e
    errorTest401() {
        this.errorSample.error401().subscribe(() => {});
    }
    errorTest403() {
        this.errorSample.error403().subscribe(() => {});
    }
    errorTest4XX() {
        this.errorSample.error40XXXByModelSample({}).subscribe(() => {});
    }
    errorTest404() {
        this.errorSample.error404().subscribe(() => {});
    }
    errorTest500() {
        this.errorSample.error500().subscribe(() => {});
    }

    submitForm() {
        if (!this.formGroup.valid) return;
        console.log(this.formGroup.value);
    }

    block() {
        this.util.ui.setBusy();
        setTimeout(() => {
            this.util.ui.clearBusy();
        }, 1000);
    }
}
