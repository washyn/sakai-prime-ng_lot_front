import { CoreModule, noop } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import {
    APP_INITIALIZER,
    ErrorHandler,
    ModuleWithProviders,
    NgModule,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { registerLocale } from '@abp/ng.core/locale';
import { handleHttpError } from './demo/components/pages/utils/http-error-handler';
import { CustomErrorHandler } from './demo/components/pages/utils/http-error-handler-custom';
import { AbpFormatErrorHandlerService } from './demo/components/pages/utils/abp-format-error-handler.service';

@NgModule({
    imports: [
        CommonModule,
        CoreModule.forRoot({
            environment: environment,
            registerLocaleFn: registerLocale(),
        }),
    ],
    exports: [],
    providers: [],
})
export class AbpCustomModule {
    static forRoot(): ModuleWithProviders<AbpCustomModule> {
        return {
            // provide = token and use class is implementation
            // { provide: ErrorHandler, useClass: CustomErrorHandler },
            ngModule: AbpCustomModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    multi: true,
                    deps: [AbpFormatErrorHandlerService],
                    useFactory: noop,
                },
            ],
        };
    }
}
