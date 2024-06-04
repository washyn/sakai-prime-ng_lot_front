import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';
import { DynamicTableRoutingModule } from './dynamic-table-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {TableModule} from "primeng/table";

@NgModule({
    imports: [
        CommonModule,
        DynamicTableRoutingModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        MultiSelectModule,
        TableModule,
    ],
    declarations: [DynamicTableComponent],
})
export class DynamicTableModule {}
