import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterModule } from './register.module';
import { RegisterComponent } from './register.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RegisterComponent }
	])],
	exports: [RouterModule]
})
export class RegisterRoutingModule { }
