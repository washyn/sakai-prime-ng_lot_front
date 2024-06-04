import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePagingAbpComponent } from './table-paging-abp.component';
import { TablePagingAbpRoutingModule } from './table-paging-abp-routing.module';
import {
    LazyLoadEvent,
    PrimeNGConfig,
    SharedModule,
    SortEvent,
} from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TablePagingAbpRoutingModule,
        SharedModule,
        TableModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [TablePagingAbpComponent],
})
export class TablePagingAbpModule {}
