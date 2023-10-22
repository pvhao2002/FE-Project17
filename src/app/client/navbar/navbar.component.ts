import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user)?.email) {
      this.isLogin = true;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']).then();
  }

}
