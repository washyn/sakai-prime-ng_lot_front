import {
    ErrorHandler,
    Injectable,
    InjectionToken,
    Injector,
    inject,
} from '@angular/core';
import { AbpUtilService } from '../abp-util.service';
import { EMPTY, Observable, filter, of } from 'rxjs';
import { HttpErrorReporterService } from '@abp/ng.core';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

export type ErrorScreenErrorCodes = 0 | 401 | 403 | 404 | 500;
export const HTTP_ERROR_HANDLER = new InjectionToken<HttpErrorHandler>(
    'HTTP_ERROR_HANDLER'
);
export type HttpErrorHandler<T = any> = (
    injector: Injector,
    httpError: HttpErrorResponse
) => Observable<T>;
export interface HttpErrorConfig {
    skipHandledErrorCodes?: ErrorScreenErrorCodes[] | number[];
}

export function httpErrorConfigFactory() {
    return {
        skipHandledErrorCodes: [401, 403, 404, 500],
    } as HttpErrorConfig;
}

@Injectable({
    providedIn: 'root',
})
export class CustomErrorHandlerService implements ErrorHandler {
    protected readonly httpErrorConfig = httpErrorConfigFactory();
    protected readonly httpErrorHandler = inject(HTTP_ERROR_HANDLER, {
        optional: true,
    });
    protected readonly httpErrorReporter = inject(HttpErrorReporterService);
    constructor(public util: AbpUtilService, protected injector: Injector) {
        this.listenToRestError();
    }

    protected listenToRestError() {
        this.httpErrorReporter.reporter$
            .pipe(
                filter(this.filterRestErrors),
                switchMap(this.executeErrorHandler)
            )
            .subscribe((err) => this.handleError(err));
    }
    handleError(error: any) {
        // TODO: handle
        return EMPTY;
    }
    protected executeErrorHandler = (error: HttpErrorResponse) => {
        if (this.httpErrorHandler) {
            return this.httpErrorHandler(this.injector, error);
        }

        return of(error);
    };
    protected filterRestErrors = ({ status }: HttpErrorResponse): boolean => {
        if (typeof status !== 'number') return false;

        if (!this.httpErrorConfig?.skipHandledErrorCodes) {
            return true;
        }

        return (
            this.httpErrorConfig.skipHandledErrorCodes?.findIndex(
                (code) => code === status
            ) < 0
        );
    };
}
