import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsAbpRoutingModule } from './utils-abp-sample-routing.module';
import { UtilsAbpSampleComponent } from './utils-abp-sample.component';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
// import { AbpUtilsModule } from '../utils/abp-util.module';
import { ConfirmationService, MessageService } from 'primeng/api';
// import { UtilsComponent } from '../utils/utils.component';

@NgModule({
    imports: [
        CommonModule,
        UtilsAbpRoutingModule,
        ButtonModule,
        // AbpUtilsModule,
        // ToastModule,
        // ConfirmDialogModule,
        // UtilsComponent,
    ],
    declarations: [UtilsAbpSampleComponent],
    providers: [
        // ConfirmationService,
        // MessageService
    ],
})
export class UtilsAbpSampleModule {}
