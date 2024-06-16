import {APP_INITIALIZER, inject, Injectable, Injector, NgModule} from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
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
import {EMPTY, noop, of} from 'rxjs';
import {AbpUtilService} from "./lot/utils/abp-util.service";
import {HttpErrorReporterService} from "@abp/ng.core";
import {filter, switchMap} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, AbpCustomModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [ErrorHandler],
            useFactory: noop,
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}


@Injectable({ providedIn: 'root' })
export class ErrorHandler {
    // protected readonly confirmationService = inject(ConfirmationService);
    // protected readonly routerErrorHandlerService = inject(
    //     RouterErrorHandlerService
    // );
    // protected readonly customErrorHandlers = inject(CUSTOM_ERROR_HANDLERS);
    protected readonly util = inject(AbpUtilService);
    protected readonly httpErrorReporter = inject(HttpErrorReporterService);
    protected readonly httpErrorConfig = inject(HTTP_ERROR_CONFIG);
    protected readonly httpErrorHandler = inject(HTTP_ERROR_HANDLER, {
        optional: false,
    });

    constructor(protected injector: Injector) {
        console.log('called to error handler...');

        this.listenToRestError();
        this.listenToRouterError();
    }

    protected listenToRouterError() {
        // this.routerErrorHandlerService.listen();
    }

    protected listenToRestError() {
        console.log('rest errror');
        console.log('Before filter...');

        this.httpErrorReporter.reporter$
            .pipe(
                filter(this.filterRestErrors),
                switchMap(this.executeErrorHandler)
            )
            .subscribe((err) => this.handleError(err));
    }

    protected executeErrorHandler = (error: HttpErrorResponse) => {
        console.log('HttpErrorResponse');
        console.log(error);

        if (this.httpErrorHandler) {
            return this.httpErrorHandler(this.injector, error);
        }

        return of(error);
    };

    protected sortHttpErrorHandlers(
        a: CustomHttpErrorHandlerService,
        b: CustomHttpErrorHandlerService
    ) {
        return (b.priority || 0) - (a.priority || 0);
    }

    protected handleError(err: unknown) {
        console.log('handleError');
        console.log(err);

        // if (this.customErrorHandlers && this.customErrorHandlers.length) {
        //     const errorHandlerService = this.customErrorHandlers
        //         .sort(this.sortHttpErrorHandlers)
        //         .find((service) => service.canHandle(err));

        //     if (errorHandlerService) {
        //         errorHandlerService.execute();
        //         return;
        //     }
        // }

        this.showError().subscribe();
    }

    protected showError() {
        return EMPTY;
    }

    // protected showError(): Observable<Confirmation.Status> {
    //     const title = {
    //         key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
    //         defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
    //     };
    //     const message = {
    //         key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.details,
    //         defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.details,
    //     };
    //     return this.confirmationService.error(message, title, {
    //         hideCancelBtn: true,
    //         yesText: 'AbpAccount::Close',
    //     });
    // }

    protected filterRestErrors = ({ status }: HttpErrorResponse): boolean => {
        if (typeof status !== 'number') return false;

        if (!this.httpErrorConfig?.skipHandledErrorCodes) {
            return true;
        }

        return (
            this.httpErrorConfig.skipHandledErrorCodes?.findIndex(
                (code) => code === status
            ) < 0
        );
    };
}
