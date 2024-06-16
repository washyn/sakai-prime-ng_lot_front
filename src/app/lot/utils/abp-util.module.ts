import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AbpUtilService } from './abp-util.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilsComponent } from './utils.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import {DEFAULT_HANDLERS_PROVIDERS} from "./error-handler/error-handlers.provider";
import {ErrorHandler} from "./error-handler";
import {noop} from "rxjs";
import {CUSTOM_ERROR_HANDLERS, HTTP_ERROR_CONFIG} from "./error-handler/http-error.token";
import {ErrorScreenErrorCodes, HttpErrorConfig} from "./error-handler/common";
import {TenantResolveErrorHandlerService} from "./error-handler/tenant-resolve-error-handler.service";
import {AbpFormatErrorHandlerService} from "./error-handler/abp-format-error-handler.service";
import {StatusCodeErrorHandlerService} from "./error-handler/status-code-error-handler.service";
import {UnknownStatusCodeErrorHandlerService} from "./error-handler/unknown-status-code-error-handler.service";
import {AbpAuthenticationErrorHandler} from "./error-handler/authentication-error-handler.service";
import {SpinnerComponent} from "./error-handler/spinner/spinner.component";

@NgModule({
    declarations: [UtilsComponent, SpinnerComponent],
    imports: [
        CommonModule,
        ToastModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        BlockUIModule,
        ProgressSpinnerModule,
    ],
    exports: [UtilsComponent, SpinnerComponent],
    providers: [MessageService, ConfirmationService, AbpUtilService,
        // {
        //     provide: APP_INITIALIZER,
        //     multi: true,
        //     deps: [ErrorHandler],
        //     useFactory: noop,
        // },
        // {
        //     provide: HTTP_ERROR_CONFIG,
        //     useValue: {
        //         skipHandledErrorCodes:[0 , 401 , 403 , 404 , 500]
        //     } as HttpErrorConfig
        // },
        // // ...DEFAULT_HANDLERS_PROVIDERS
        // {
        //     provide: CUSTOM_ERROR_HANDLERS,
        //     multi: true,
        //     useExisting: TenantResolveErrorHandlerService,
        // },
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
        //     useExisting: UnknownStatusCodeErrorHandlerService,
        // },
        // {
        //     provide: CUSTOM_ERROR_HANDLERS,
        //     multi: true,
        //     useExisting: AbpAuthenticationErrorHandler,
        // },
    ],
})
export class AbpUtilsModule {}
