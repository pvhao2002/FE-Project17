import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  listService: any = [];

  constructor(private http: HttpClient) {

  }


  delete(id: any) {
    if (!confirm('Bạn có chắc chắn muốn xóa?')) return;
    this.http.delete('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/services/delete/' + id)
      .subscribe((res: any) => {
        this.ngOnInit();
      });
  }

  ngOnInit(): void {
    const breadcum2 = document.getElementById('breadcrumb2');
    if (breadcum2 != null)
      breadcum2.textContent = 'Danh sách dịch vụ'

    this.http.get('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/services/getAll')
      .subscribe((res: any) => {
        this.listService = res;
      });

    const url = window.location.href.toString();
    if (url.includes('service')) {
      // set a tag in li tag have class nav-item
      const a = document.getElementsByClassName('nav-link');
      for (let i = 0; i < a.length; i++) {
        a[i].classList.remove('active');
        a[i].classList.remove('bg-gradient-primary');
      }
      if (!a[2].className.includes('active')) {
        a[2].className += ' active bg-gradient-primary';
      }
    }
  }


}
