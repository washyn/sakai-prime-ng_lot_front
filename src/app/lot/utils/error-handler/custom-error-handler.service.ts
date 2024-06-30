import {
    ErrorHandler,
    Injectable,
    InjectionToken,
    Injector,
    inject,
} from '@angular/core';
import { AbpUtilService } from '../abp-util.service';
import { EMPTY, Observable, filter, of, throwError } from 'rxjs';
import { HttpErrorReporterService, LocalizationParam } from '@abp/ng.core';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {
    DEFAULT_ERROR_LOCALIZATIONS,
    DEFAULT_ERROR_MESSAGES,
} from './default-errors';
import { CustomHttpErrorHandlerService, HttpErrorConfig } from './common';
import { CUSTOM_ERROR_HANDLERS, HTTP_ERROR_HANDLER } from './http-error.token';

// export type ErrorScreenErrorCodes = 0 | 401 | 403 | 404 | 500;
// export const HTTP_ERROR_HANDLER = new InjectionToken<HttpErrorHandler>(
//     'HTTP_ERROR_HANDLER'
// );
// export type HttpErrorHandler<T = any> = (
//     injector: Injector,
//     httpError: HttpErrorResponse
// ) => Observable<T>;
// export interface HttpErrorConfig {
//     skipHandledErrorCodes?: ErrorScreenErrorCodes[] | number[];
// }

export function httpErrorConfigFactory() {
    return {
        skipHandledErrorCodes: [401, 403, 404, 500],
    } as HttpErrorConfig;
}

// TODO: fix for show another erros in console, or add http error interceptor ...
@Injectable({
    providedIn: 'root',
})
export class CustomErrorHandlerService {
    constructor(public util: AbpUtilService, protected injector: Injector) {}

    protected handleError(err: unknown) {
        if (!(err instanceof HttpErrorResponse)) {
            console.log('Global error handler');
            this.util.notify.warn('Ocurrio un error inesperado.');
        }
    }
}
