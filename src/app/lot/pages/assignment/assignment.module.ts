import { NgModule } from '@angular/core';
import { AssignmentComponent } from './assignment.component';
import { PrimeCommonModule } from '../prime-common.module';
import { AssignmentRouterModule } from './assignment-router.module';
import { ListModule } from '../list/list.module';
import { RegistrationListComponent } from '../registration-list/registration-list.component';
import { NgxValidateCoreModule } from '@ngx-validate/core';

@NgModule({
    declarations: [AssignmentComponent],
    imports: [
        AssignmentRouterModule,
        PrimeCommonModule,
        ListModule,
        NgxValidateCoreModule,
        RegistrationListComponent,
    ],
})
export class AssignmentModule {}
