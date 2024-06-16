import { CoreModule, LocalizationModule, noop } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { registerLocale } from '@abp/ng.core/locale';
import { CustomErrorHandlerService } from './lot/utils/error-handler/custom-error-handler.service';

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
    providers: [
        { provide: ErrorHandler, useExisting: CustomErrorHandlerService },
    ],
})
export class AbpCustomModule {
    static forRoot(): ModuleWithProviders<AbpCustomModule> {
        return {
            ngModule: AbpCustomModule,
        };
    }
}
