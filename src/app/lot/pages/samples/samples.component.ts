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
<!--        -->
        <form [formGroup]="formGroup" (ngSubmit)="submitForm()">
            <div class="field">
                <label>Nombre</label>
                <input formControlName="nombre"/>
            </div>

            <button type="button" (click)="submitForm()">
                Submit
            </button>
        </form>
    `,
    // changeDetection: ChangeDetectionStrategy.OnPush,
    // encapsulation: ViewEncapsulation.None,
})
export class SamplesComponent implements OnInit {
    // TODO: test block ui and create...

    formGroup: FormGroup;

    constructor(public util: AbpUtilService, public formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            nombre: new FormControl('', [
                Validators.required,
            ]),
        });
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
