import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RegisterRoutingModule} from "../register/register-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {RadioButtonModule} from "primeng/radiobutton";
import {NgxValidateCoreModule} from "@ngx-validate/core";
import {LotManagmentComponent} from "./lot-managment.component";
import LotManagmentRouterModule from "./lot-managment-router.module";

@NgModule({
    imports: [
        CommonModule,
        LotManagmentRouterModule,
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
    declarations: [LotManagmentComponent],
    exports: [
        LotManagmentComponent
    ]
})
export class LotManagmentModule{}
