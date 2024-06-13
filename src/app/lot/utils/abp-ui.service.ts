import { ConfigStateService } from '@abp/ng.core';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AbpUiService {
    locked: boolean = false;

    constructor() {}

    setBusy() {
        this.locked = true;
    }
    clearBusy() {
        this.locked = false;
    }
}
