import { Component } from '@angular/core';
import { AbpUtilService } from './abp-util.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AbpMessageService } from './abp-message.service';
import { AbpNotifyService } from './abp-notify.service';

@Component({
    selector: 'app-utils',
    // imports: [ToastModule, ConfirmDialogModule],
    // standalone: true,
    template: `
        <div>
            <p-toast position="bottom-right"></p-toast>
            <p-confirmDialog [position]="'center'"></p-confirmDialog>
        </div>
    `,
    providers: [
        // MessageService,
        // ConfirmationService,

        AbpUtilService,
        AbpMessageService,
        AbpNotifyService,
    ],
})
export class UtilsComponent {
    constructor() {}
}
