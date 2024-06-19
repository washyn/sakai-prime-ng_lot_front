import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AssignmentRouterModule} from "./assignment/assignment-router.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";
import {LocalizationModule} from "@abp/ng.core";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AssignmentRouterModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        AutoCompleteModule,
        DropdownModule,
        RadioButtonModule,
        TableModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        CardModule,
        CheckboxModule,
        DialogModule,
        TableModule,
        LocalizationModule,
    ],
    exports:[
        CommonModule,
        AssignmentRouterModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        AutoCompleteModule,
        DropdownModule,
        RadioButtonModule,
        TableModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        CardModule,
        CheckboxModule,
        DialogModule,
        TableModule,
        LocalizationModule,
    ]
})
export class PrimeCommonModule {}
