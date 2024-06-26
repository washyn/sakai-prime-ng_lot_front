import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AbpUtilService } from './abp-util.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilsComponent } from './utils.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ToastModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        BlockUIModule,
        ProgressSpinnerModule,
    ],
    exports: [],
    providers: [MessageService, ConfirmationService, AbpUtilService],
})
export class AbpUtilsModule {}
