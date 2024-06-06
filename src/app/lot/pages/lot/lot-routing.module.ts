import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LotComponent } from './lot.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: LotComponent }])],
    exports: [RouterModule],
})
export class LotRoutingModule {}
