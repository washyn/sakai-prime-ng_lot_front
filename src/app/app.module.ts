import {
    APP_INITIALIZER,
    ErrorHandler,
    inject,
    Injectable,
    Injector,
    NgModule,
} from '@angular/core';
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
import { EMPTY, noop, of } from 'rxjs';
import { AbpUtilService } from './lot/utils/abp-util.service';
import { HttpErrorReporterService } from '@abp/ng.core';
import { filter, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

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
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
