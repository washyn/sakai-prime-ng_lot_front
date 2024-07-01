import { Injectable, Injector } from '@angular/core';
import { AbpUtilService } from '../abp-util.service';

@Injectable({
    providedIn: 'root',
})
export class CustomErrorHandlerService {
    constructor(public util: AbpUtilService, protected injector: Injector) {}
    protected handleError(err: unknown) {
        this.util.notify.warn('Ocurrio un error inesperado.', 'Error.');
        console.error(err);
    }
}
