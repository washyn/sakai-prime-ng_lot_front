import {CoreModule, HttpErrorReporterService, LocalizationModule, noop} from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import {
    APP_INITIALIZER, ErrorHandler, Injectable, InjectionToken, Injector,
    // ErrorHandler,
    ModuleWithProviders,
    NgModule,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { registerLocale } from '@abp/ng.core/locale';
// import { handleHttpError } from './demo/components/pages/utils/http-error-handler';
// import { CustomErrorHandler } from './demo/components/pages/utils/http-error-handler-custom';
// import { AbpFormatErrorHandlerService } from './demo/components/pages/utils/abp-format-error-handler.service';
// import {
//     HTTP_ERROR_CONFIG,
//     RootParams,
//     httpErrorConfigFactory, HttpErrorConfig,
// } from './lot/utils/error-handler';
import {HTTP_INTERCEPTORS, HttpErrorResponse} from '@angular/common/http';
// import { HttpErrorInterceptor } from './lot/utils/http-error-interceptor';
import {catchError, filter, Observable, of, switchMap, throwError} from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler {
    // toastService = inject(ToastService);

    //This method comes from interface
    handleError(error: any): void {
        // this.toastService.showError(error.message);
        console.log("handleError error -> ")
        console.log(error)
    }
}




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
    providers:[
        {provide:ErrorHandler,useExisting:CustomErrorHandlerService}
    ]
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
