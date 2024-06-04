import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list-routing.module';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
@NgModule({
    imports: [
        CommonModule,
        ListRoutingModule,
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
    ],
    declarations: [ListComponent],
})
export class ListModule {}
