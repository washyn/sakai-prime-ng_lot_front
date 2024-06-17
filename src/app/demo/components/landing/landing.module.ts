import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import {RegisterModule} from "../../../lot/pages/register/register.module";
import {RegistrationListComponent} from "../../../lot/pages/registration-list/registration-list.component";
import {AbpUtilsModule} from "../../../lot/utils/abp-util.module";

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        ButtonModule,
        RegisterModule,
        RegistrationListComponent,
        AbpUtilsModule
    ],
    declarations: [LandingComponent]
})
export class LandingModule { }
