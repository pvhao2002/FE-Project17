import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observer} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  message: string = '';
  form: FormGroup;
  status: any;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      fullName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl('', [Validators.pattern(/^[0-9]{10}$/)]),
      address: new FormControl(''),
      roleId: new FormControl(0),
      id: new FormControl(0),
    });
  }

  submit() {
    if (this.form.valid && this.form.value.roleId != 0) {
      this.http.patch('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/user/update', this.form.value)
        .subscribe({
          next: (response: any) => {
            if (response && response?.status == 200) {
               this.router.navigate(['/admin/user/list']).then();
            } else {
              this.message = "Cập nhật thất bại";
              this.status = '203';
            }
          },
          error: (error: any) => {
            this.message = "Thêm mới thất bại";
            this.status = '203';
          }
        } as Observer<any>);
    } else {
      if (!this.form.value.username) {
        this.message = "Tên đăng nhập không được để trống";
      } else if (!this.form.value.password) {
        this.message = "Mật khẩu không được để trống";
      } else if (!this.form.value.fullName) {
        this.message = "Họ tên không được để trống";
      } else if (!this.form.value.email) {
        this.message = "Email không được để trống";
      } else if (!this.form.value.phone) {
        this.message = "Số điện thoại không được để trống";
      } else if (!this.form.value.address) {
        this.message = "Địa chỉ không được để trống";
      } else if (this.form.value.roleId == 0) {
        this.message = "Vai trò không được để trống";
      } else if (this.form.controls['phone'].hasError('pattern')) {
        this.message = "Số điện thoại không đúng định dạng";
      } else {
        this.message = "Thêm mới thất bại";
      }
    }
  }

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('id');
    if (uid) {
      this.http.get(`http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/user/get/${uid}`)
        .subscribe({
          next: (response: any) => {
            if (response && response?.status != 204 && response.username !== 'admin') {
              this.form.patchValue({
                username: response.username,
                password: response.password,
                fullName: response.fullName,
                email: response.email,
                phone: response.phone,
                address: response.address,
                roleId: response.roleId,
                id: response.id,
              });
              // add class css to all div tag have class 'class="input-group input-group-outline mb-3'
              const divs = document.querySelectorAll('div.input-group.input-group-outline');
              divs.forEach((div) => {
                div.classList.add('is-filled');
              });
            } else {
              this.router.navigate(['/admin/user/list']).then();
            }
          },
          error: (error) => {
            this.router.navigate(['/admin/user/list']).then();
          }
        } as Observer<any>);
    }
  }
}
