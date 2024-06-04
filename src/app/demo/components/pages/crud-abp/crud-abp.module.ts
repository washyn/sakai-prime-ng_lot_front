import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbpCrudRoutingModule } from './crud-abp-routing.module';

@NgModule({
    imports: [CommonModule, AbpCrudRoutingModule]
})
export class CrudApbModule {}

