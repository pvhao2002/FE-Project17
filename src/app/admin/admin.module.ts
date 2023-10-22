import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ListServiceComponent } from './services/list-service/list-service.component';
import { AddServiceComponent } from './services/add-service/add-service.component';
import { UpdateServiceComponent } from './services/update-service/update-service.component';
import { ListAppointmentComponent } from './appointment/list-appointment/list-appointment.component';
import { AdminComponent } from './admin.component';
import {RouterOutlet} from "@angular/router";
import {AdminRoutingModule} from "./admin-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    FooterComponent,
    HomeComponent,
    ListUserComponent,
    AddUserComponent,
    UpdateUserComponent,
    ListServiceComponent,
    AddServiceComponent,
    UpdateServiceComponent,
    ListAppointmentComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [AdminComponent, FooterComponent]
})
export class AdminModule { }
