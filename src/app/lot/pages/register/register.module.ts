import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import {NgxValidateCoreModule} from "@ngx-validate/core";

import {ErrorComponent} from "../../utils/error.component";
@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule,
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
    declarations: [RegisterComponent],
    exports: [
        RegisterComponent
    ]
})
export class RegisterModule {}
