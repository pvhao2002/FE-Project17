import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  listUser: any = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/user/list')
      .subscribe((res: any) => {
        this.listUser = res.data;
      });

    const url = window.location.href.toString();
    if (url.includes('user')) {
      // set a tag in li tag have class nav-item
      const a = document.getElementsByClassName('nav-link');
      for (let i = 0; i < a.length; i++) {
        a[i].classList.remove('active');
        a[i].classList.remove('bg-gradient-primary');
      }
      if(!a[1].className.includes('active')) {
        a[1].className += ' active bg-gradient-primary';
      }
    }
  }


  deleteUser(id: any) {
    if (!confirm('Bạn có chắc chắn muốn xóa?')) return;
    this.http.delete('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/user/delete/' + id)
      .subscribe((res: any) => {
        this.ngOnInit();
      });
  }

}
