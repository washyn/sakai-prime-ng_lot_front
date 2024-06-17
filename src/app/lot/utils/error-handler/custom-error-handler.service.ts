import {
    ErrorHandler,
    Injectable,
    InjectionToken,
    Injector,
    inject,
} from '@angular/core';
import { AbpUtilService } from '../abp-util.service';
import { EMPTY, Observable, filter, of } from 'rxjs';
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

@Injectable({
    providedIn: 'root',
})
export class CustomErrorHandlerService {
    protected readonly customErrorHandlers = inject(CUSTOM_ERROR_HANDLERS);
    protected readonly httpErrorReporter = inject(HttpErrorReporterService);
    protected readonly httpErrorConfig = httpErrorConfigFactory();
    protected readonly httpErrorHandler = inject(HTTP_ERROR_HANDLER, {
        optional: true,
    });

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

    protected executeErrorHandler = (error: HttpErrorResponse) => {
        if (this.httpErrorHandler) {
            return this.httpErrorHandler(this.injector, error);
        }

        return of(error);
    };

    protected sortHttpErrorHandlers(
        a: CustomHttpErrorHandlerService,
        b: CustomHttpErrorHandlerService
    ) {
        return (b.priority || 0) - (a.priority || 0);
    }

    protected handleError(err: unknown) {
        if (this.customErrorHandlers && this.customErrorHandlers.length) {
            const errorHandlerService = this.customErrorHandlers
                .sort(this.sortHttpErrorHandlers)
                .find((service) => service.canHandle(err));

            if (errorHandlerService) {
                errorHandlerService.execute();
                return;
            }
        }

        this.showError().subscribe();
    }
    protected showError(): Observable<void> {
        const title = {
            key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
            defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
        };
        const message = {
            key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.details,
            defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.details,
        };
        // TODO:handle 403 error test when register...
        // return this.confirmationService.error(message, title, {
        //     hideCancelBtn: true,
        //     yesText: 'AbpAccount::Close',
        // });
        this.util.notify.error(message.defaultValue, title.defaultValue);
        // this.util.notify.error('Ocurrio un error inesperado.', 'Error');
        return EMPTY;
    }
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
