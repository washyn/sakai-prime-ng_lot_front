import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LotComponent} from "../lot/lot.component";
import {AssignmentComponent} from "./assignment.component";

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: AssignmentComponent }])],
    exports: [RouterModule],
})
export class AssignmentRouterModule {}
