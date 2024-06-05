import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ResultLotComponent } from './result-lot.component';
import { ResultLotRoutingModule } from './result-lot-routing.module';
import { TableModule } from 'primeng/table';
@NgModule({
    imports: [
        CommonModule,
        ResultLotRoutingModule,
        FormsModule,
        TableModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        AutoCompleteModule,
        DropdownModule,
        RadioButtonModule,
    ],
    declarations: [ResultLotComponent],
})
export class ResultLotModule {}
