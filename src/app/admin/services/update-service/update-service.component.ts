import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Observer} from "rxjs";

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit{
  message: string = '';
  form: FormGroup;
  status: any;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
    this.form = new FormGroup({
      serviceName: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      id: new FormControl(0),
    });
  }

  submit() {
    if (this.form.valid && this.form.value.roleId != 0) {
      this.http.patch('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/services/update', this.form.value)
        .subscribe({
          next: (response: any) => {
            if (response && response?.data == true) {
              this.router.navigate(['/admin/service/list']).then();
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
      if (!this.form.value.servicename) {
        this.message = "Tên dịch vụ không được để trống";
      } else if (!this.form.value.description) {
        this.message = "Mô tả không được để trống";
      } else if (!this.form.value.image) {
        this.message = "Hình ảnh không được để trống";
      } else {
        this.message = "Thêm mới thất bại";
      }
    }
  }

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('id');
    if (uid) {
      this.http.get(`http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/services/getById/${uid}`)
        .subscribe({
          next: (response: any) => {
            if (response) {
              console.log(response);
              this.form.patchValue({
                serviceName: response.data.serviceName,
                price: response.data.price,
                description: response.data.description,
                image: response.data.image,
                id: response.data.id,
              });
              const divs = document.querySelectorAll('div.input-group.input-group-outline');
              divs.forEach((div) => {
                div.classList.add('is-filled');
              });
            } else {
              this.router.navigate(['/admin/service/list']).then();
            }
          },
          error: (error) => {
            this.router.navigate(['/admin/service/list']).then();
          }
        } as Observer<any>);
    }
  }
}
