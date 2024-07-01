import { ConfigStateService } from '@abp/ng.core';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
    providedIn: 'root',
})
export class AbpUiService {
    constructor(private spinner: NgxSpinnerService) {}

    // auto close in 60 secconds...
    setBusy() {
        this.spinner.show();
        setTimeout(()=>{
            this.clearBusy();
        }, 1000 * 60);
    }

    clearBusy() {
        this.spinner.hide();
    }
}
