import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observer} from "rxjs";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  message: string = '';
  success: boolean = false;
  form: any = {
    roleId: 0
  };
  status: any;

  constructor(private http: HttpClient) {
  }

  addUser(data: any) {
    if (data.valid && data.value.roleId !== 0 && data.value.roleId !== undefined) {
      this.http.post('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/user/register', data.value)
        .subscribe({
          next: (response: any) => {
            this.message = response.message;
            this.status = response.status;
            this.form = {};
          },
          error: (error: any) => {
            this.message = "Thêm mới thất bại";
            this.status = '203';
          }
        } as Observer<any>);
    } else {
      if (data.value.username === undefined) {
        this.message = "Tên đăng nhập không được để trống";
        this.success = false;
      } else if (data.value.password === undefined) {
        this.message = "Mật khẩu không được để trống";
        this.success = false;
      } else if (data.value.fullName === undefined) {
        this.message = "Họ tên không được để trống";
        this.success = false;
      } else if (data.value.email === undefined) {
        this.message = "Email không được để trống";
        this.success = false;
      } else if (data.value.phone === undefined) {
        this.message = "Số điện thoại không được để trống";
        this.success = false;
      } else if (data.value.address === undefined) {
        this.message = "Địa chỉ không được để trống";
        this.success = false;
      } else if (data.value.roleId === undefined || data.value.roleId === 0) {
        this.message = "Vai trò không được để trống";
        this.success = false;
      } else if (data.controls['email'].status === 'INVALID' || data.controls['email'].hasError('email')) {
        this.message = "Email không đúng định dạng";
        this.success = false;
      } else if (data.controls['phone'].status === 'INVALID') {
        this.message = "Số điện thoại không đúng định dạng";
        this.success = false;
      } else {
        this.message = "Thêm mới thất bại";
        this.success = false;
      }
    }
  }
}
