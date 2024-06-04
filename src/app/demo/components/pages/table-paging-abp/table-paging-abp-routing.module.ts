import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TablePagingAbpComponent } from './table-paging-abp.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: TablePagingAbpComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class TablePagingAbpRoutingModule {}
