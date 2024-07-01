import { NgxValidateCoreModule } from '@ngx-validate/core';
import { SettingManagmentRouterModule } from './setting-managment-router.module';
import { SettingManagmentComponent } from './setting-managment.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        SettingManagmentRouterModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        AutoCompleteModule,
        DropdownModule,
        InputNumberModule,
        RadioButtonModule,
        NgxValidateCoreModule,
    ],
    declarations: [SettingManagmentComponent],
    exports: [SettingManagmentComponent],
})
export class SettingManagmentModule {}
