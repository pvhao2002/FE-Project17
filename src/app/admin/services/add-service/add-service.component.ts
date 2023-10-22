import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observer} from "rxjs";

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent {
  message: string = '';
  success: boolean = false;
  form: any = {};
  status: any;

  constructor(private http: HttpClient) {
  }

  add(data: any) {
    if (data.valid) {
      this.http.post('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/services/add', data.value)
        .subscribe({
          next: (response: any) => {
             if(response.data == true) {
               this.message = "Thêm mới thành công";
               this.status = '200';
               this.form = {};
             } else {
                this.message = "Thêm mới thất bại";
                this.status = '203';
             }
          },
          error: (error: any) => {
            this.message = "Thêm mới thất bại";
            this.status = '203';
          }
        } as Observer<any>);
    } else {
      if (!data.value.servicename) {
        this.message = "Tên dịch vụ không được để trống";
      } else if (!data.value.description) {
        this.message = "Mô tả không được để trống";
      } else if (!data.value.image) {
        this.message = "Hình ảnh không được để trống";
      } else {
        this.message = "Thêm mới thất bại";
      }
    }
  }
}
