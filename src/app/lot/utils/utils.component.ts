import { Component } from '@angular/core';
import { AbpUtilService } from './abp-util.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AbpMessageService } from './abp-message.service';
import { AbpNotifyService } from './abp-notify.service';
import { AbpUiService } from './abp-ui.service';

// TODO: add global error handler... add interceptor and ...
// check sample application loader, or set bussy page for create
// TODO: add component here
@Component({
    selector: 'app-utils',
    // imports: [ToastModule, ConfirmDialogModule],
    // standalone: true,
    template: `
        <div>
            <!-- <p-blockUI [blocked]="blockedDocument" /> -->
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
        AbpUiService,
    ],
})
export class UtilsComponent {
    // can be add util component.
    constructor() {}
}
