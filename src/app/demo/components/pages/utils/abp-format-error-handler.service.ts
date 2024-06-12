import { inject, Injectable } from '@angular/core';
import {
    AuthService,
    HttpErrorReporterService,
    LocalizationParam,
} from '@abp/ng.core';
import { HttpErrorResponse } from '@angular/common/http';
import { er } from '@fullcalendar/core/internal-common';
import { filter, switchMap } from 'rxjs';
import { AbpUtilService } from 'src/app/lot/utils/abp-util.service';

// import { getErrorFromRequestBody } from '../utils/error.utils';
// import { CustomHttpErrorHandlerService } from '../models/common';
// import { ConfirmationService } from '../services/confirmation.service';
// import { CUSTOM_HTTP_ERROR_HANDLER_PRIORITY } from '../constants/default-errors';

export const DEFAULT_ERROR_MESSAGES_SPANISH = {
    defaultError: {
        title: '¡Se ha producido un error!',
        details: 'Detalle del error no enviado por el servidor.',
    },
    defaultError401: {
        title: 'No estas autenticado!',
        details:
            'Debe estar autenticado (iniciar sesión) para poder realizar esta operación.',
    },
    defaultError403: {
        title: 'No estas autorizado!',
        details: 'No está permitido realizar esta operación.',
    },
    defaultError404: {
        title: 'Recurso no encontrado!',
        details: 'El recurso solicitado no se pudo encontrar en el servidor.',
    },
    defaultError500: {
        title: 'Error interno del servidor!',
        details: 'Detalle del error no enviado por el servidor.',
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
export function getErrorFromRequestBody(
    body: { details?: string; message?: string } | undefined
) {
    let message: LocalizationParam;
    let title: LocalizationParam;

    if (body.details) {
        message = body.details;
        title = body.message;
    } else if (body.message) {
        title = {
            key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
            defaultValue: DEFAULT_ERROR_MESSAGES_SPANISH.defaultError.title,
        };
        message = body.message;
    } else {
        message = {
            key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
            defaultValue: DEFAULT_ERROR_MESSAGES_SPANISH.defaultError.title,
        };
        title = '';
    }

    return { message, title };
}

export interface CustomHttpErrorHandlerService {
    // readonly priority: number;
    canHandle(error: unknown): boolean;
    execute(): void;
}

@Injectable({ providedIn: 'root' })
// implements CustomHttpErrorHandlerService
export class AbpFormatErrorHandlerService {
    // readonly priority = CUSTOM_HTTP_ERROR_HANDLER_PRIORITY.high;
    // private confirmationService = inject(ConfirmationService);
    protected readonly httpErrorReporter = inject(HttpErrorReporterService);
    private util = inject(AbpUtilService);
    private authService = inject(AuthService);
    private error: HttpErrorResponse | undefined = undefined;

    constructor() {
        this.listenToRestError();
        // add error reporter and use
    }

    protected listenToRestError() {
        this.httpErrorReporter.reporter$
            // .pipe(
            //     filter(this.filterRestErrors),
            //     switchMap(this.executeErrorHandler)
            // )
            .subscribe((err) => this.handleError(err));
    }

    private navigateToLogin() {
        return this.authService.navigateToLogin();
    }

    // TODO: falta el injecto de solo http error... pero si esta global deberia mostgra trodo
    // add in constructor...

    protected handleError(err: unknown) {
        console.log('error handkes');
        console.log(err);

        if (this.canHandle(err)) {
            this.execute();
        }
    }

    canHandle(error: unknown): boolean {
        if (
            error instanceof HttpErrorResponse &&
            error.headers.get('_AbpErrorFormat')
        ) {
            this.error = error;
            return true;
        }
        return false;
    }
    // protected filterRestErrors = ({ status }: HttpErrorResponse): boolean => {
    //     if (typeof status !== 'number') return false;

    //     if (!this.httpErrorConfig?.skipHandledErrorCodes) {
    //         return true;
    //     }

    //     return (
    //         this.httpErrorConfig.skipHandledErrorCodes?.findIndex(
    //             (code) => code === status
    //         ) < 0
    //     );
    // };
    // protected executeErrorHandler = (error: HttpErrorResponse) => {
    //     if (this.httpErrorHandler) {
    //         return this.httpErrorHandler(this.injector, error);
    //     }

    //     return of(error);
    // };
    execute() {
        const { message, title } = getErrorFromRequestBody(
            this.error?.error?.error
        );

        // this.confirmationService
        //     .error(message, title, {
        //         hideCancelBtn: true,
        //         yesText: 'AbpAccount::Close',
        //     })
        //     .subscribe(() => {
        //         if (this.error?.status === 401) {
        //             this.navigateToLogin();
        //         }
        //     });

        // TODO: if error is 401 redirect to login page

        console.log(message);
        console.log(title);

        this.util.notify.error('Error body', 'Error title');
    }
}
