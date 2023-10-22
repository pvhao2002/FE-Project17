import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ClientComponent} from "./client.component";
import {ServicesComponent} from "./services/services.component";
import {BookingComponent} from "./booking/booking.component";
import {LoginComponent} from "./login/login.component";
import {MyBookingComponent} from "./my-booking/my-booking.component";
import {guardGuard} from "../guard.guard";

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
      , {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'list-service',
        component: ServicesComponent
      }, {
        path: 'book-appointment',
        component: BookingComponent
      }, {
        path: 'login',
        component: LoginComponent
      }, {
        path: 'my-booking',
        canActivate: [guardGuard],
        component: MyBookingComponent
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
}
