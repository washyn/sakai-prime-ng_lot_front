import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AbpUtilService } from './abp-util.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilsComponent } from './utils.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ToastModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        BlockUIModule,
        ProgressSpinnerModule,
        BrowserAnimationsModule,
        NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate' })
    ],
    exports: [],
    providers: [MessageService, ConfirmationService, AbpUtilService],
    schemas: [],
})
export class AbpUtilsModule {}
