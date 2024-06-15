import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AbpUtilService } from './abp-util.service';
import { Injectable, inject } from '@angular/core';
import { AuthService, LocalizationParam } from '@abp/ng.core';

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

// Error localization tokens
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
            defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
        };
        message = body.message;
    } else {
        message = {
            key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
            defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
        };
        title = '';
    }

    return { message, title };
}

@Injectable({
    providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(public util: AbpUtilService) {}

    private authService = inject(AuthService);
    private error: HttpErrorResponse | undefined = undefined;

    private navigateToLogin() {
        return this.authService.navigateToLogin();
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

    execute() {
        const { message, title } = getErrorFromRequestBody(
            this.error?.error?.error
        );
        console.log(message);
        console.log(title);

        this.util.notify.error('Mensajeeeeee');
        //            .error(message, title, {
        //                hideCancelBtn: true,
        //                yesText: 'AbpAccount::Close',
        //            })
        //            .subscribe(() => {
        //                if (this.error?.status === 401) {
        //                    this.navigateToLogin();
        //                }
        //            });
    }

    // TODO: use filter of
    // TODO: ver el orden de los interceptores y ver cual metodo se debe ejecutar primero la validacion de codigo de error o el metodo de revision de header _AbpErrorFormat
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                //                HttpErrorResponse
                //                error.error
                //this.util.notify.error(error);
                console.log(error);
                if (this.canHandle(error)) {
                    console.log(' se puede manejar');

                    this.execute();
                }
                return throwError(error);
            })
        );
    }
}
