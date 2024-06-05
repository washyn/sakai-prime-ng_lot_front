import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResultLotComponent } from './result-lot.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: ResultLotComponent }]),
    ],
    exports: [RouterModule],
})
export class ResultLotRoutingModule {}
