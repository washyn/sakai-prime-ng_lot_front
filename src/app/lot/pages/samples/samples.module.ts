import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { SamplesComponent } from './samples.component';
import { SamplesRouteModule } from './samples.routing.module';
import { ButtonModule } from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxValidateCoreModule} from "@ngx-validate/core";

import {ErrorComponent} from "../../utils/error.component";

// NOTE:can be add methods for test, error methods withoud sleep
@NgModule({
    imports: [
        SamplesRouteModule,
        CommonModule,
        FormsModule,
        LocalizationModule, ButtonModule, ReactiveFormsModule,
        NgxValidateCoreModule,
    ],
    declarations: [SamplesComponent],
})
export class SamplesModule {}
