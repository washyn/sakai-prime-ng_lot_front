import { ConfigStateService } from '@abp/ng.core';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AbpUiService {
    private loading: boolean = false;

    constructor() {}

    setBusy() {
        this.loading = true;
    }
    clearBusy() {
        this.loading = false;
    }

    // setLoading(loading: boolean) {
    //     this.loading = loading;
    // }
    getLoading(): boolean {
        return this.loading;
    }
}
