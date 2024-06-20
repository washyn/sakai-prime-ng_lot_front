import { ConfigStateService } from '@abp/ng.core';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
    providedIn: 'root',
})
export class AbpUiService {
    constructor(private spinner: NgxSpinnerService) {}

    setBusy() {
        this.spinner.show();
    }
    clearBusy() {
        this.spinner.hide();
    }
}
