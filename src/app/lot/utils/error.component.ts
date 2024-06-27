import {
    ChangeDetectionStrategy,
    Component,
    ModuleWithProviders,
    NgModule,
    ViewEncapsulation,
} from '@angular/core';
import {
    NgxValidateCoreModule,
    ValidationErrorComponent,
} from '@ngx-validate/core';
import { CoreModule } from '@abp/ng.core';
// import { ValidationErrorComponent } from "@abp/ng.theme.basic";


@Component({
    selector: "app-validation-error",
    template: `
        <small
            class="text-red-500"
            *ngFor="let error of errors; trackBy: trackByFn"
        >
            {{ error.message | abpLocalization }}
        </small>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ErrorComponent extends ValidationErrorComponent {}



// @Component({
//     selector: 'app-error',
//     template: ` <small
//         class="text-red-500"
//         *ngFor="let error of errors; trackBy: trackByFn"
//     >
//         {{ error.message }}
//     </small>`,
//     changeDetection: ChangeDetectionStrategy.OnPush,
//     encapsulation: ViewEncapsulation.None,
// })
// export class ErrorComponent extends ValidationErrorComponent {}

// TODO: create module as forr root and add in global...

// @NgModule({
//     declarations: [ErrorComponent],
//     exports: [ErrorComponent],
//     imports: [CoreModule, NgxValidateCoreModule],
// })
// export class BaseThemeBasicModule {}
//
// @NgModule({
//     exports: [],
//     imports: [],
// })
// export class ThemeBasicModule {
//     static forRoot(): ModuleWithProviders<ThemeBasicModule> {
//         return {
//             ngModule: ThemeBasicModule,
//             providers: [
//                 // BASIC_THEME_NAV_ITEM_PROVIDERS,
//                 // BASIC_THEME_USER_MENU_PROVIDERS,
//                 // BASIC_THEME_STYLES_PROVIDERS,
//                 // {
//                 //     provide: VALIDATION_ERROR_TEMPLATE,
//                 //     useValue: ValidationErrorComponent,
//                 // },
//                 // {
//                 //     provide: VALIDATION_TARGET_SELECTOR,
//                 //     useValue: '.form-group',
//                 // },
//                 // {
//                 //     provide: VALIDATION_INVALID_CLASSES,
//                 //     useValue: 'is-invalid',
//                 // },
//             ],
//         };
//     }
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @NgModule({
//     declarations: [ErrorComponent],
//     exports: [ErrorComponent],
//     imports: [CoreModule, NgxValidateCoreModule],
// })
// export class ValidationModule {
//     static forRoot(): ModuleWithProviders<ValidationModule> {
//         return {
//             ngModule: ValidationModule,
//             providers: [],
//         };
//     }
// }
