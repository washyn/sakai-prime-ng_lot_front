import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudAbpComponent } from './crud-abp.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: CrudAbpComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AbpCrudRoutingModule {}
