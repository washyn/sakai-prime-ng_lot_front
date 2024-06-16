import {CoreModule, HttpErrorReporterService, LocalizationModule, noop} from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import {
    APP_INITIALIZER, Injectable, InjectionToken, Injector,
    // ErrorHandler,
    ModuleWithProviders,
    NgModule,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { registerLocale } from '@abp/ng.core/locale';
// import { handleHttpError } from './demo/components/pages/utils/http-error-handler';
// import { CustomErrorHandler } from './demo/components/pages/utils/http-error-handler-custom';
// import { AbpFormatErrorHandlerService } from './demo/components/pages/utils/abp-format-error-handler.service';
import {
    HTTP_ERROR_CONFIG,
    RootParams,
    httpErrorConfigFactory, HttpErrorConfig,
} from './lot/utils/error-handler';
import {HTTP_INTERCEPTORS, HttpErrorResponse} from '@angular/common/http';
import { HttpErrorInterceptor } from './lot/utils/http-error-interceptor';
import {catchError, filter, Observable, of, switchMap, throwError} from "rxjs";

//TODO: build with electron
@NgModule({
    imports: [
        CommonModule,
        CoreModule.forRoot({
            environment: environment,
            registerLocaleFn: registerLocale(),
        }),
        LocalizationModule,
    ],
    exports: [LocalizationModule],
    // TODO: add interceptor for catch all error with error levels, same as abp 8 version...
    // providers: [
    //     {
    //         provide: HTTP_INTERCEPTORS,
    //         useClass: HttpErrorInterceptor,
    //         multi: true,
    //     },
    // ],
})
export class AbpCustomModule {
    static forRoot(): ModuleWithProviders<AbpCustomModule> {
        return {
            // provide = token and use class is implementation
            // { provide: ErrorHandler, useClass: CustomErrorHandler },
            ngModule: AbpCustomModule,

        };
    }
}

export type HttpErrorHandler = (
    injector: Injector,
    httpError: HttpErrorResponse,
) => Observable<any>;

export const HTTP_ERROR_HANDLER = new InjectionToken<HttpErrorHandler>('HTTP_ERROR_HANDLER');

@Injectable({ providedIn: 'root' })
export class ErrorHandler {
    // componentRef: ComponentRef<HttpErrorWrapperComponent> | null = null;

    protected httpErrorHandler = this.injector.get(HTTP_ERROR_HANDLER, (_, err: HttpErrorResponse) => throwError(err));
    protected httpErrorReporter: HttpErrorReporterService;
    // protected httpErrorConfig: HttpErrorConfig;

    constructor(protected injector: Injector) {
        this.httpErrorReporter = injector.get(HttpErrorReporterService);
        // this.httpErrorConfig = injector.get('HTTP_ERROR_CONFIG');
        this.listenToRestError();
    }

    protected listenToRestError() {
        this.httpErrorReporter.reporter$
            .pipe(filter(this.filterRestErrors), switchMap(this.executeErrorHandler))
            .subscribe();
    }

    private executeErrorHandler = (error: any) => {
        const errHandler = this.httpErrorHandler(this.injector, error);
        const isObservable = errHandler instanceof Observable;
        const response = isObservable ? errHandler : of(null);

        return response.pipe(
            catchError((err) => {
                this.handleError(err);
                return of(null);
            })
        );
    };

    private handleError(err: any) {
        // get type and display rigth way
        console.log("error manejado de handle error")
        console.log(err)
        if (err instanceof HttpErrorResponse && err.url?.includes('openid-configuration')) {
            return;
        }

        // const body = err?.error?.error || {
        //     key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
        //     defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
        // };
        //
        // if (err instanceof HttpErrorResponse && err.headers.get('_AbpErrorFormat')) {
        //     console.log('Abp errror format');
        //
        //     const confirmation$ = this.showErrorWithRequestBody(body);
        //
        //     if (err.status === 401) {
        //         console.log('navegacion a login 401');
        //
        //         confirmation$.subscribe(() => {
        //             this.navigateToLogin();
        //         });
        //     }
        // } else {
        //     console.log('otro error difrente a 401');
        //
        //     switch (err.status) {
        //         case 401:
        //             this.canCreateCustomError(401)
        //                 ? this.show401Page()
        //                 : this.showError(
        //                     {
        //                         key: DEFAULT_ERROR_LOCALIZATIONS.defaultError401.title,
        //                         defaultValue: DEFAULT_ERROR_MESSAGES.defaultError401.title,
        //                     },
        //                     {
        //                         key: DEFAULT_ERROR_LOCALIZATIONS.defaultError401.details,
        //                         defaultValue: DEFAULT_ERROR_MESSAGES.defaultError401.details,
        //                     }
        //                 ).subscribe(() => this.navigateToLogin());
        //             console.log('switch 401');
        //
        //             break;
        //         case 403:
        //             this.createErrorComponent({
        //                 title: {
        //                     key: DEFAULT_ERROR_LOCALIZATIONS.defaultError403.title,
        //                     defaultValue: DEFAULT_ERROR_MESSAGES.defaultError403.title,
        //                 },
        //                 details: {
        //                     key: DEFAULT_ERROR_LOCALIZATIONS.defaultError403.details,
        //                     defaultValue: DEFAULT_ERROR_MESSAGES.defaultError403.details,
        //                 },
        //                 status: 403,
        //             });
        //             console.log('switch 403');
        //             break;
        //         case 404:
        //             this.canCreateCustomError(404)
        //                 ? this.show404Page()
        //                 : this.showError(
        //                     {
        //                         key: DEFAULT_ERROR_LOCALIZATIONS.defaultError404.details,
        //                         defaultValue: DEFAULT_ERROR_MESSAGES.defaultError404.details,
        //                     },
        //                     {
        //                         key: DEFAULT_ERROR_LOCALIZATIONS.defaultError404.title,
        //                         defaultValue: DEFAULT_ERROR_MESSAGES.defaultError404.title,
        //                     }
        //                 );
        //             console.log('switch 404');
        //             break;
        //         case 500:
        //             this.createErrorComponent({
        //                 title: {
        //                     key: DEFAULT_ERROR_LOCALIZATIONS.defaultError500.title,
        //                     defaultValue: DEFAULT_ERROR_MESSAGES.defaultError500.title,
        //                 },
        //                 details: {
        //                     key: DEFAULT_ERROR_LOCALIZATIONS.defaultError500.details,
        //                     defaultValue: DEFAULT_ERROR_MESSAGES.defaultError500.details,
        //                 },
        //                 status: 500,
        //             });
        //             console.log('switch 500');
        //             break;
        //         case 0:
        //             if (err.statusText === 'Unknown Error') {
        //                 console.log('Unknown Error');
        //                 this.createErrorComponent({
        //                     title: {
        //                         key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
        //                         defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
        //                     },
        //                     details: err.message,
        //                     isHomeShow: false,
        //                 });
        //             }
        //             break;
        //         default:
        //             console.log('default lanza error');
        //             this.showError(
        //                 {
        //                     key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.details,
        //                     defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.details,
        //                 },
        //                 {
        //                     key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
        //                     defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
        //                 }
        //             );
        //             break;
        //     }
        // }
    }
    //
    // protected show401Page() {
    //     this.createErrorComponent({
    //         title: {
    //             key: DEFAULT_ERROR_LOCALIZATIONS.defaultError401.title,
    //             defaultValue: DEFAULT_ERROR_MESSAGES.defaultError401.title,
    //         },
    //         status: 401,
    //     });
    // }
    //
    // protected show404Page() {
    //     this.createErrorComponent({
    //         title: {
    //             key: DEFAULT_ERROR_LOCALIZATIONS.defaultError404.title,
    //             defaultValue: DEFAULT_ERROR_MESSAGES.defaultError404.title,
    //         },
    //         status: 404,
    //     });
    // }
    //
    // protected showErrorWithRequestBody(body: any) {
    //     let message: LocalizationParam;
    //     let title: LocalizationParam;
    //
    //     if (body.details) {
    //         message = body.details;
    //         title = body.message;
    //     } else if (body.message) {
    //         title = {
    //             key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
    //             defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
    //         };
    //         message = body.message;
    //     } else {
    //         message = body.message || {
    //             key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
    //             defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
    //         };
    //         title = '';
    //     }
    //     // TODO: mostrar el message en message.error() tipo error
    //     // sienpre mostrar solo el message
    //     console.log('showErrorWithRequestBody');
    //     console.log(body);
    //     console.log('message, title');
    //     console.log(message);
    //     console.log(title);
    //
    //     return this.showError(message, title);
    // }
    //
    // protected showError(message: LocalizationParam, title: LocalizationParam): Observable<any> {
    //     console.log('Show error');
    //     return EMPTY;
    // }
    //
    // private navigateToLogin() {}
    //
    // createErrorComponent(instance: Partial<HttpErrorWrapperComponent>) {
    //     console.log('error component');
    // }
    //
    // canCreateCustomError(status: ErrorScreenErrorCodes): boolean {
    //     return !!(
    //         this.httpErrorConfig?.errorScreen?.component &&
    //         this.httpErrorConfig?.errorScreen?.forWhichErrors &&
    //         this.httpErrorConfig?.errorScreen?.forWhichErrors.indexOf(status) > -1
    //     );
    // }
    //
    protected filterRestErrors = ({ status }: HttpErrorResponse): boolean => {
        if (typeof status !== 'number') return false;
        let errorsCanBeHandle : HttpErrorConfig  = {
            skipHandledErrorCodes:[401, 403, 404, 500]
        }
        return (
            !!errorsCanBeHandle.skipHandledErrorCodes &&
            errorsCanBeHandle.skipHandledErrorCodes.findIndex((code) => code === status) < 0
        );
    };
    //
    // protected filterRouteErrors = (navigationError: NavigationError): boolean => {
    //     return (
    //         navigationError.error?.message?.indexOf('Cannot match') > -1 &&
    //         !!this.httpErrorConfig.skipHandledErrorCodes &&
    //         this.httpErrorConfig.skipHandledErrorCodes.findIndex((code) => code === 404) < 0
    //     );
    // };
}
