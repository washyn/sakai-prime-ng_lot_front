import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { SamplesComponent } from './samples.component';
import { SamplesRouteModule } from './samples.routing.module';
import { ButtonModule } from 'primeng/button';

// NOTE:can be add methods for test, error methods withoud sleep
@NgModule({
    imports: [SamplesRouteModule, LocalizationModule, ButtonModule],
    declarations: [SamplesComponent],
})
export class SamplesModule {}
