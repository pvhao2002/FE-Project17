import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {BannerComponent} from './banner/banner.component';
import {BookingComponent} from './booking/booking.component';
import {ServicesComponent} from './services/services.component';
import {ClientComponent} from "./client.component";
import {RouterOutlet} from "@angular/router";
import {ClientRoutingModule} from "./client-routing.module";
import { PageHeaderComponent } from './page-header/page-header.component';
import { LoginComponent } from './login/login.component';
import { TopbarComponent } from './topbar/topbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule} from "@angular/forms";
import { MyBookingComponent } from './my-booking/my-booking.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BannerComponent,
    BookingComponent,
    ServicesComponent,
    ClientComponent,
    PageHeaderComponent,
    LoginComponent,
    TopbarComponent,
    NavbarComponent,
    MyBookingComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ClientRoutingModule,
    FormsModule
  ],
  exports: [ClientComponent]
})
export class ClientModule {
}
