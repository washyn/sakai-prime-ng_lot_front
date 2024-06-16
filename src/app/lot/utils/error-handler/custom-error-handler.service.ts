import { ErrorHandler, Injectable } from '@angular/core';
import { AbpUtilService } from '../abp-util.service';
import { EMPTY } from 'rxjs';

// TODO: se rquiere el http error reporter service.
@Injectable({
    providedIn: 'root',
})
export class CustomErrorHandlerService implements ErrorHandler {
    constructor(public util: AbpUtilService) {}
    handleError(error: any) {
        this.util.notify.error('Ocurrio un error inesperado.', 'Error');
        return EMPTY;
    }
}
