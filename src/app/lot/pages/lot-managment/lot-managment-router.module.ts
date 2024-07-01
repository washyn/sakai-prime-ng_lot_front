import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RegisterComponent} from "../register/register.component";
import {LotManagmentComponent} from "./lot-managment.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LotManagmentComponent }
    ])],
    exports: [RouterModule]
})
export default class LotManagmentRouterModule{}
