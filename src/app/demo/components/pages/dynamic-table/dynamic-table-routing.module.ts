import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicTableComponent } from './dynamic-table.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: DynamicTableComponent }]),
    ],
    exports: [RouterModule],
})
export class DynamicTableRoutingModule {}
