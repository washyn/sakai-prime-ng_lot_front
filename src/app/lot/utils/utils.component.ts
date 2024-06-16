import {Component, Input, OnInit} from '@angular/core';
import {AbpUtilService} from './abp-util.service';
import {AbpMessageService} from './abp-message.service';
import {AbpNotifyService} from './abp-notify.service';
import {AbpUiService} from './abp-ui.service';

// TODO: add global error handler... add interceptor and ...check sample application loader, or set bussy page for create
// TODO: agregar un loader basico, sin importar que sea una libreria externa por mientras...
@Component({
    selector: 'app-utils',
    template: `
        <div>
<!--            <p-blockUI [blocked]="data">-->
<!--                <p-progressSpinner ariaLabel="loading" />-->
<!--            </p-blockUI>-->
<!--            <app-spinner></app-spinner>-->
            <p-toast position="bottom-right"></p-toast>
            <p-confirmDialog [style]="{ width: '30rem' }" [position]="'center'"></p-confirmDialog>
        </div>
    `,
    providers: [
        AbpUtilService,
        AbpMessageService,
        AbpNotifyService,
        AbpUiService,
    ],
})
export class UtilsComponent implements OnInit {
    constructor() {
    }
    ngOnInit(): void {
    }
}
