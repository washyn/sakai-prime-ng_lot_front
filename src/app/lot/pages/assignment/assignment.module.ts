import { NgModule } from '@angular/core';
import {AssignmentComponent} from "./assignment.component";
import {PrimeCommonModule} from "../prime-common.module";
import {AssignmentRouterModule} from "./assignment-router.module";
import {ButtonModule} from "primeng/button";
import {CoreTestingModule} from "@abp/ng.core/testing";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AutoCompleteModule} from "primeng/autocomplete";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {LocalizationModule} from "@abp/ng.core";
import {ListModule} from "../list/list.module";
import {RegistrationListComponent} from "../registration-list/registration-list.component";

@NgModule({
    declarations: [AssignmentComponent],
    imports: [
        AssignmentRouterModule,
        PrimeCommonModule,
        ListModule,
        RegistrationListComponent
    ],
})
export class AssignmentModule {}
