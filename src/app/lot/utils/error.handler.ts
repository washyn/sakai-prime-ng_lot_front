import {
    inject,
    Injectable,
    InjectionToken,
    Injector,
    Type,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { HttpErrorReporterService } from '@abp/ng.core';
import { AbpUiService } from './abp-ui.service';
import { AbpUtilService } from './abp-util.service';

// import { CustomHttpErrorHandlerService } from '../models/common';
// import { Confirmation } from '../models/confirmation';

// import {
//     CUSTOM_ERROR_HANDLERS,
//     HTTP_ERROR_HANDLER,
// } from '../tokens/http-error.token';
// import { HTTP_ERROR_CONFIG } from '../tokens/http-error.token';
// import {
//     DEFAULT_ERROR_LOCALIZATIONS,
//     DEFAULT_ERROR_MESSAGES,
// } from '../constants/default-errors';

// import { ConfirmationService } from '../services/confirmation.service';
// import { RouterErrorHandlerService } from '../services/router-error-handler.service';

export const DEFAULT_ERROR_MESSAGES = {
    defaultError: {
        title: 'An error has occurred!',
        details: 'Error detail not sent by server.',
    },
    defaultError401: {
        title: 'You are not authenticated!',
        details:
            'You should be authenticated (sign in) in order to perform this operation.',
    },
    defaultError403: {
        title: 'You are not authorized!',
        details: 'You are not allowed to perform this operation.',
    },
    defaultError404: {
        title: 'Resource not found!',
        details: 'The resource requested could not found on the server.',
    },
    defaultError500: {
        title: 'Internal server error',
        details: 'Error detail not sent by server.',
    },
};

export const DEFAULT_ERROR_LOCALIZATIONS = {
    defaultError: {
        title: 'AbpUi::DefaultErrorMessage',
        details: 'AbpUi::DefaultErrorMessageDetail',
    },
    defaultError401: {
        title: 'AbpUi::DefaultErrorMessage401',
        details: 'AbpUi::DefaultErrorMessage401Detail',
    },
    defaultError403: {
        title: 'AbpUi::DefaultErrorMessage403',
        details: 'AbpUi::DefaultErrorMessage403Detail',
    },
    defaultError404: {
        title: 'AbpUi::DefaultErrorMessage404',
        details: 'AbpUi::DefaultErrorMessage404Detail',
    },
    defaultError500: {
        title: 'AbpUi::500Message',
        details: 'AbpUi::DefaultErrorMessage',
    },
};

export const CUSTOM_HTTP_ERROR_HANDLER_PRIORITY = Object.freeze({
    veryLow: -99,
    low: -9,
    normal: 0,
    high: 9,
    veryHigh: 99,
});

export const HTTP_ERROR_STATUS = {
    '401': 'AbpUi::401Message',
    '403': 'AbpUi::403Message',
    '404': 'AbpUi::404Message',
    '500': 'AbpUi::500Message',
};

export const HTTP_ERROR_DETAIL = {
    '401': 'AbpUi::DefaultErrorMessage401Detail',
    '403': 'AbpUi::DefaultErrorMessage403Detail',
    '404': 'AbpUi::DefaultErrorMessage404Detail',
    '500': 'AbpUi::DefaultErrorMessage',
};

export interface RootParams {
    httpErrorConfig?: HttpErrorConfig;
    // validation?: Partial<Validation.Config>;
    // confirmationIcons?: Partial<ConfirmationIcons>;
}

export type ErrorScreenErrorCodes = 0 | 401 | 403 | 404 | 500;

export interface HttpErrorConfig {
    skipHandledErrorCodes?: ErrorScreenErrorCodes[] | number[];
    errorScreen?: {
        component: Type<any>;
        forWhichErrors?: ErrorScreenErrorCodes[];
        hideCloseIcon?: boolean;
    };
}
export type HttpErrorHandler<T = any> = (
    injector: Injector,
    httpError: HttpErrorResponse
) => Observable<T>;

// export type LocaleDirection = 'ltr' | 'rtl';

export interface CustomHttpErrorHandlerService {
    readonly priority: number;
    canHandle(error: unknown): boolean;
    execute(): void;
}

export const HTTP_ERROR_CONFIG = new InjectionToken<HttpErrorConfig>(
    'HTTP_ERROR_CONFIG'
);

/**
  @deprecated use **`CUSTOM_ERROR_HANDLERS`** injection token instead of this, see more info https://docs.abp.io/en/abp/latest/UI/Angular/HTTP-Requests
*/
export const HTTP_ERROR_HANDLER = new InjectionToken<HttpErrorHandler>(
    'HTTP_ERROR_HANDLER'
);

export const CUSTOM_ERROR_HANDLERS = new InjectionToken<
    CustomHttpErrorHandlerService[]
>('CUSTOM_ERROR_HANDLERS');

@Injectable({ providedIn: 'root' })
export class ErrorHandler {
    // protected readonly confirmationService = inject(ConfirmationService);
    // protected readonly routerErrorHandlerService = inject(
    //     RouterErrorHandlerService
    // );
    // protected readonly customErrorHandlers = inject(CUSTOM_ERROR_HANDLERS);
    protected readonly util = inject(AbpUtilService);
    protected readonly httpErrorReporter = inject(HttpErrorReporterService);
    protected readonly httpErrorConfig = inject(HTTP_ERROR_CONFIG);
    protected readonly httpErrorHandler = inject(HTTP_ERROR_HANDLER, {
        optional: true,
    });

    constructor(protected injector: Injector) {
        console.log('called to error handler...');

        this.listenToRestError();
        this.listenToRouterError();
    }

    protected listenToRouterError() {
        // this.routerErrorHandlerService.listen();
    }

    protected listenToRestError() {
        console.log('rest errror');
        console.log('Before filter...');

        this.httpErrorReporter.reporter$
            .pipe(
                filter(this.filterRestErrors),
                switchMap(this.executeErrorHandler)
            )
            .subscribe((err) => this.handleError(err));
    }

    protected executeErrorHandler = (error: HttpErrorResponse) => {
        console.log('HttpErrorResponse');
        console.log(error);

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
        console.log('handleError');
        console.log(err);

        // if (this.customErrorHandlers && this.customErrorHandlers.length) {
        //     const errorHandlerService = this.customErrorHandlers
        //         .sort(this.sortHttpErrorHandlers)
        //         .find((service) => service.canHandle(err));

        //     if (errorHandlerService) {
        //         errorHandlerService.execute();
        //         return;
        //     }
        // }

        this.showError().subscribe();
    }

    protected showError() {
        return EMPTY;
    }

    // protected showError(): Observable<Confirmation.Status> {
    //     const title = {
    //         key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
    //         defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
    //     };
    //     const message = {
    //         key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.details,
    //         defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.details,
    //     };
    //     return this.confirmationService.error(message, title, {
    //         hideCancelBtn: true,
    //         yesText: 'AbpAccount::Close',
    //     });
    // }

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
