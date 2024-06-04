import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UtilsAbpSampleComponent } from './utils-abp-sample.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: UtilsAbpSampleComponent }]),
    ],
    exports: [RouterModule],
})
export class UtilsAbpRoutingModule {}
