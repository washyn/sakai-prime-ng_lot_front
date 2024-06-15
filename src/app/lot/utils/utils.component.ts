import {Component, Input, OnInit} from '@angular/core';
import {AbpUtilService} from './abp-util.service';
import {AbpMessageService} from './abp-message.service';
import {AbpNotifyService} from './abp-notify.service';
import {AbpUiService} from './abp-ui.service';

// TODO: add global error handler... add interceptor and ...
// check sample application loader, or set bussy page for create


//
//add component here
// add block ui sample...
@Component({
    selector: 'app-utils',
    // imports: [ToastModule, ConfirmDialogModule],
    template: `
        <div>
            <p-blockUI [blocked]="data">
                <p-progressSpinner ariaLabel="loading" />
            </p-blockUI>
            <p-toast position="bottom-right"></p-toast>
            <p-confirmDialog [style]="{ width: '30rem' }" [position]="'center'"></p-confirmDialog>
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
export class UtilsComponent implements OnInit {
    _data: boolean = false;

    get data(): boolean {
        let temp = this.uiService.locked;
        this._data = temp;
        return temp;
    }

    set data(value: true) {
        this._data = value;
        this.uiService.locked = value;
    }

    constructor(public uiService: AbpUiService) {
    }

    ngOnInit(): void {
        // this.data = this.uiService.dataSubject.getValue();
        // this.uiService.dataSubject
        //     .asObservable()
        //     .subscribe((data) => (this.data = data));
    }
}
