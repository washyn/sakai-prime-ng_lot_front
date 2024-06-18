import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { SamplesComponent } from './samples.component';
import { RouterModule } from '@angular/router';

// NOTE:can be add methods for test, error methods withoud sleep
@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: SamplesComponent }]),
    ],
    exports: [RouterModule],
})
export class SamplesRouteModule {}
