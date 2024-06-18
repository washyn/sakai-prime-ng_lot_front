import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbpUtilService } from '../../utils/abp-util.service';

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
    `,
    styles: ``,
})
export class SamplesComponent {
    // TODO: test block ui and create...
    constructor(public util: AbpUtilService) {}

    block() {
        this.util.ui.setBusy();
        setTimeout(() => {
            this.util.ui.clearBusy();
        }, 1000);
    }
}
