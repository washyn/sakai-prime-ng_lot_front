import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingManagmentComponent } from './setting-managment.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: SettingManagmentComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class SettingManagmentRouterModule {}
