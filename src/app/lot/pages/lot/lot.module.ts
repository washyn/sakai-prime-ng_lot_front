import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { GenderPipe } from '../gender.pipe';
import { AreaPipe } from '../area.pipe';
import { LotRoutingModule } from './lot-routing.module';
import { LotComponent } from './lot.component';
import { LocalizationModule } from '@abp/ng.core';
import { RandomChoiserComponent } from '../components/random-choiser/random-choiser.component';
import {ListModule} from "../list/list.module";

@NgModule({
    declarations: [LotComponent],
    imports: [
        CommonModule,
        LotRoutingModule,
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
        RandomChoiserComponent,
        ListModule,
    ],
})
export class LotModule {}
