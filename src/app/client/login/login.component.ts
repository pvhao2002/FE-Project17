import {Component, OnInit, AfterViewInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

declare let $: any; // Import jQuery

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  formModel: any = {
    username: '',
    password: '',
    email: '',
    address: '',
    fullName: '',
    roleId: 2
  }
  message: any = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  register(): void {
    this.http.post('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/user/register', this.formModel)
      .subscribe((res: any) => {
        console.log(res);
        if (res?.status == '203') {
          this.message = res?.message;
        } else {
          this.message = 'Đăng ký thành công';
          this.formModel = {
            username: '',
            password: '',
            email: '',
            address: '',
            fullName: '',
            roleId: 2
          }
          $('.tab a:contains("Đăng nhập")').trigger('click');
        }
      });
  }

  ngAfterViewInit(): void {
    // Sử dụng ngAfterViewInit để đảm bảo các phần tử đã được tạo
    $('.form').find('input, textarea').on('keyup blur focus', (e: Event) => {
      const $this = $(e.target),
        label = $this.prev('label');

      if (e.type === 'keyup') {
        if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
      } else if (e.type === 'blur') {
        if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.removeClass('highlight');
        }
      } else if (e.type === 'focus') {
        if ($this.val() === '') {
          label.removeClass('highlight');
        } else if ($this.val() !== '') {
          label.addClass('highlight');
        }
      }
    });

    $('.tab a').on('click', function (e: Event) {
      e.preventDefault();

      // Đảm bảo chỉ thực hiện khi tab chưa có class "active"
      if (!$(e.target).parent().hasClass('active')) {
        $(e.target).parent().addClass('active');
        $(e.target).parent().siblings().removeClass('active');

        const target = $(e.target).attr('href');

        $('.tab-content > div').hide();
        $(target).fadeIn(600);
      }
    });
  }

  login(): void {
    this.http.post('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/user/login', this.formModel)
      .subscribe((res: any) => {
        if (res?.status == '203') {
          this.message = res?.message;
        } else {
          localStorage.setItem('user', JSON.stringify(res));
          if (res?.roleId == 1) {
            window.location.href = '/admin';
          } else {
            window.location.href = '/';
          }
        }
      });
  }
}

export interface account {
  id: any;
  username: any;
  password: any;
  fullName: any;
  email: any;
  phone: any;
  address: any;
  roleId: any;
  isDelete: any;
}
