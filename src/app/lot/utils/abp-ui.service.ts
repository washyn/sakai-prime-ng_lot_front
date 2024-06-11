// abp.ui.clearBusy();
// abp.ui.setBusy();
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class AbpUiService {
    // blockedDocument = false;
    constructor() {}

    setBusy() {
        // this.blockedDocument = true;
        // console.log(this.blockedDocument);
    }
    clearBusy() {
        // this.blockedDocument = false;
        // console.log(this.blockedDocument);
    }
}
