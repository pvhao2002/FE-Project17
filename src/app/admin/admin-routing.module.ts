import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {HomeComponent} from "./home/home.component";
import {ListUserComponent} from "./user/list-user/list-user.component";
import {AddUserComponent} from "./user/add-user/add-user.component";
import {UpdateUserComponent} from "./user/update-user/update-user.component";
import {ListServiceComponent} from "./services/list-service/list-service.component";
import {AddServiceComponent} from "./services/add-service/add-service.component";
import {UpdateServiceComponent} from "./services/update-service/update-service.component";
import {ListAppointmentComponent} from "./appointment/list-appointment/list-appointment.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }, {
        path: 'user',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          }, {
            path: 'list',
            component: ListUserComponent
          }, {
            path: 'add',
            component: AddUserComponent
          }, {
            path: 'edit/:id',
            component: UpdateUserComponent
          }
        ]
      }, {
        path: 'service',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          }, {
            path: 'list',
            component: ListServiceComponent
          }, {
            path: 'add',
            component: AddServiceComponent
          }, {
            path: 'edit/:id',
            component: UpdateServiceComponent
          }
        ]
      }, {
        path: 'appointment',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          }, {
            path: 'list',
            component: ListAppointmentComponent
          }

        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
