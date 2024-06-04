import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule
    ],
    declarations: [RegisterComponent]
})
export class RegisterModule { }
