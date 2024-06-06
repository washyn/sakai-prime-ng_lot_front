import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AbpUtilService } from './abp-util.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilsComponent } from './utils.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
// TODO: add dependencies for work...
@NgModule({
    declarations: [UtilsComponent],
    imports: [
        CommonModule,
        ToastModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        BlockUIModule,
    ],
    exports: [UtilsComponent],
    providers: [MessageService, ConfirmationService, AbpUtilService],
})
export class AbpUtilsModule {}
