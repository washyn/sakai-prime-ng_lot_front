import {
    APP_INITIALIZER,
    ErrorHandler,
    inject,
    Injectable,
    Injector,
    NgModule,
} from '@angular/core';
import {PathLocationStrategy, LocationStrategy, NgForOf} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { AbpCustomModule } from './abp.module';
import { EMPTY, noop, of } from 'rxjs';
import { AbpUtilService } from './lot/utils/abp-util.service';
import { HttpErrorReporterService } from '@abp/ng.core';
import { filter, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {NgxValidateCoreModule, VALIDATION_BLUEPRINTS, VALIDATION_ERROR_TEMPLATE} from '@ngx-validate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './lot/utils/error.component';
import {DEFAULT_VALIDATION_BLUEPRINTS, ThemeSharedModule} from "@abp/ng.theme.shared";

@NgModule({
    declarations: [AppComponent, NotfoundComponent, ErrorComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        AbpCustomModule,
        FormsModule,
        ReactiveFormsModule,
        NgxValidateCoreModule.forRoot({
            blueprints: {
                ...DEFAULT_VALIDATION_BLUEPRINTS,
                // required:"Este campo es requerido."
            },
            errorTemplate: ErrorComponent,
            targetSelector: '.field',
        }),
        NgForOf,

        // ThemeSharedModule.forRoot()
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        provideRouter([], withComponentInputBinding()),
        // {
        //     provide: VALIDATION_BLUEPRINTS,
        //     useValue: {
        //         ...DEFAULT_VALIDATION_BLUEPRINTS,
        //     },
        // },
        // {
        //     provide: VALIDATION_ERROR_TEMPLATE,
        //     useValue: ErrorComponent,
        // },
    ],
    exports: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
