import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AbpUtilService } from './abp-util.service';
import { AuthService, ConfigStateService } from '@abp/ng.core';
import { getErrorFromRequestBody } from '@abp/ng.theme.shared';
import {
    DEFAULT_ERROR_LOCALIZATIONS,
    DEFAULT_ERROR_MESSAGES,
} from './error-handler/default-errors';

export class HttpErrorInterceptor implements HttpInterceptor {
    private error: HttpErrorResponse | undefined = undefined;
    protected readonly authService = inject(AuthService);
    protected readonly configStateService = inject(ConfigStateService);
    private statusText = 'Unknown Error';
    private message = '';
    protected readonly handledStatusCodes = [401, 403, 404, 500] as const;
    protected status: (typeof this.handledStatusCodes)[number];

    util = inject(AbpUtilService);

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                // TODO: check validate handled status codes...
                // this.canHandle(error); //  this handle autentication
                console.error(error);
                if (this.canHandle2(error)) {
                    console.log('Handler 2');
                    this.execute2();
                    // return throwError(() => error);
                }
                if (this.canHandle3(error)) {
                    console.log('Handler 3');
                    this.execute3();
                    // return throwError(() => error);
                }
                if (this.canHandle4(error)) {
                    console.log('Handler 4');
                    this.execute4();
                    // return throwError(() => error);
                }
                return EMPTY;
            })
        );
    }

    handleHttpErrorResponse(error: HttpErrorResponse) {
        // switch (this.status) {
        //     case 401:
        //     case 404:
        //         // if (canCreateCustomError) {
        //         //     this.showPage();
        //         //     break;
        //         // }
        //         this.util.notify.error(messageText, titleText);
        //         if (this.status === 401) {
        //             this.authService.navigateToLogin();
        //             break;
        //         }
        //         // this.showConfirmation(title, message).subscribe();
        //         break;
        //     case 403:
        //     case 500:
        //         this.util.notify.error(messageText, titleText);
        //         // this.showPage();
        //         break;
        // }

        switch (error.status) {
            case 401:
                break;
            case 403:
                break;
            case 404:
                break;
            case 500:
                break;
            default:
                break;
        }
    }

    handle500(error: HttpErrorResponse) {
        // ...
    }

    // el valor que debe devolver revisar de acuerdo a la documentacion de ABP.

    // intercept(req: HttpRequest<any>, next: HttpHandler) {
    //     return next.handle(req).pipe(
    //         catchError((error) => {
    //             this.toastService.showError(error.message);
    //             return EMPTY;
    //         })
    //     );
    // }

    canHandle(error: unknown) {
        let res = error instanceof HttpErrorResponse && error.status === 401;
        if (res) {
            this.configStateService
                .refreshAppState()
                .subscribe(({ currentUser }) => {
                    if (!currentUser.isAuthenticated) {
                        this.authService.logout({
                            noRedirectToLogoutUrl: true,
                        });
                    }
                });
        }
    }

    canHandle2(error: unknown): boolean {
        if (
            error instanceof HttpErrorResponse &&
            error.headers.get('_AbpErrorFormat')
        ) {
            this.error = error;
            return true;
        }
        return false;
    }

    // TODO: apply localization to title by default spanish
    execute2() {
        const { message, title } = getErrorFromRequestBody(
            this.error?.error?.error
        );

        let finalMessage =
            typeof message === 'string'
                ? (message as string)
                : message.defaultValue;

        let finalTitle =
            typeof title === 'string' ? (title as string) : title.defaultValue;

        this.util.notify.error(finalMessage, finalTitle);
    }

    canHandle3(
        error:
            | { status: number; statusText: string; message: string }
            | undefined
    ): boolean {
        if (
            error &&
            error.status === 0 &&
            error.statusText === this.statusText
        ) {
            this.message = error.message;
            return true;
        }
        return false;
    }

    execute3() {
        // this.createErrorComponentService.execute({
        //     title: {
        //         key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
        //         defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
        //     },
        //     details: this.message,
        //     isHomeShow: false,
        // });
        this.util.notify.error(
            this.message,
            DEFAULT_ERROR_MESSAGES.defaultError.title
        );
    }

    canHandle4(error): boolean {
        this.status = error?.status || 0;
        return this.handledStatusCodes.indexOf(this.status) > -1;
    }

    execute4(): void {
        const key = `defaultError${this.status}`;
        const title = {
            key: DEFAULT_ERROR_LOCALIZATIONS[key]?.title,
            defaultValue: DEFAULT_ERROR_MESSAGES[key]?.title,
        };
        const message = {
            key: DEFAULT_ERROR_LOCALIZATIONS[key]?.details,
            defaultValue: DEFAULT_ERROR_MESSAGES[key]?.details,
        };

        this.util.notify.error(message.defaultValue, title.defaultValue);

        // const canCreateCustomError = this.createErrorComponentService.canCreateCustomError(this.status);
        //
        // switch (this.status) {
        //     case 401:
        //     case 404:
        //         if (canCreateCustomError) {
        //             this.showPage();
        //             break;
        //         }
        //
        //         if (this.status === 401) {
        //             this.authService.navigateToLogin();
        //             break;
        //         }
        //
        //         this.showConfirmation(title, message).subscribe();
        //         break;
        //     case 403:
        //     case 500:
        //         this.showPage();
        //         break;
        // }
    }

    // protected showConfirmation(
    //     message: LocalizationParam,
    //     title: LocalizationParam,
    // ): Observable<Confirmation.Status> {
    //     return this.confirmationService.error(message, title, {
    //         hideCancelBtn: true,
    //         yesText: 'AbpAccount::Close',
    //     });
    // }
    //
    // protected showPage(): void {
    //     const key = `defaultError${this.status}`;
    //     const shouldRemoveDetail = [401, 404].indexOf(this.status) > -1;
    //     const instance = {
    //         title: {
    //             key: DEFAULT_ERROR_LOCALIZATIONS[key]?.title,
    //             defaultValue: DEFAULT_ERROR_MESSAGES[key]?.title,
    //         },
    //         details: {
    //             key: DEFAULT_ERROR_LOCALIZATIONS[key]?.details,
    //             defaultValue: DEFAULT_ERROR_MESSAGES[key]?.details,
    //         },
    //         status: this.status,
    //     };
    //
    //     if (shouldRemoveDetail) {
    //         delete instance.details;
    //     }
    //
    //     this.createErrorComponentService.execute(instance);
    // }
}
