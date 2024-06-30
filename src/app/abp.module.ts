import { CoreModule, LocalizationModule, noop } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { registerLocale } from '@abp/ng.core/locale';
import { CustomErrorHandlerService } from './lot/utils/error-handler/custom-error-handler.service';
import { AbpFormatErrorHandlerService } from './lot/utils/error-handler/abp-format-error-handler.service';
import { CUSTOM_ERROR_HANDLERS } from './lot/utils/error-handler/http-error.token';
import { StatusCodeErrorHandlerService } from './lot/utils/error-handler/status-code-error-handler.service';
import { AbpAuthenticationErrorHandler } from './lot/utils/error-handler/authentication-error-handler.service';
import { UnknownStatusCodeErrorHandlerService } from './lot/utils/error-handler/unknown-status-code-error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './lot/utils/http-error-interceptor';

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
    providers: [
        { provide: ErrorHandler, useExisting: CustomErrorHandlerService },
        //
        // {
        //     provide: CUSTOM_ERROR_HANDLERS,
        //     multi: true,
        //     useExisting: AbpFormatErrorHandlerService,
        // },
        // {
        //     provide: CUSTOM_ERROR_HANDLERS,
        //     multi: true,
        //     useExisting: StatusCodeErrorHandlerService,
        // },
        // {
        //     provide: CUSTOM_ERROR_HANDLERS,
        //     multi: true,
        //     useExisting: AbpAuthenticationErrorHandler,
        // },
        // {
        //     provide: CUSTOM_ERROR_HANDLERS,
        //     multi: true,
        //     useExisting: UnknownStatusCodeErrorHandlerService,
        // },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
    ],
})
export class AbpCustomModule {
    static forRoot(): ModuleWithProviders<AbpCustomModule> {
        return {
            ngModule: AbpCustomModule,
        };
    }
}
