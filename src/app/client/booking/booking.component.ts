import {Component, OnInit, Renderer2} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  formModel: any = {
    userId: '',
    fullName: '',
    email: '',
    phone: '',
    serviceId: '',
    appointmentDate: '',
    description: '',
    status: 'pending'
  }
  listServices: any = [];

  constructor(private meta: Meta,
              private title: Title,
              private renderer: Renderer2,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user?.username) {
      this.formModel.userId = user?.id;
      this.formModel.fullName = user?.fullName;
      this.formModel.email = user?.email;
      this.formModel.phone = user?.phone;
    }

    // this.addScriptToBody('../../assets/js/main.js');
    this.http.get('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/services/getAll')
      .subscribe((res: any) => {
        if (res?.status != '203') {
          this.listServices = res;
        }
      });
  }

  booking(): void {
    //   check user login
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user?.username) {
      alert('Bạn chưa đăng nhập');
      window.location.href = '/login';
      return;
    }
    // check valid form
    if (!this.formModel.serviceId ||
      !this.formModel.appointmentDate ||
      !this.formModel.serviceId ||
      !this.formModel.phone ||
      !this.formModel.email ||
      !this.formModel.fullName
    ) {
      alert('Bạn chưa nhập đủ thông tin');
      return;
    }
    this.http.post('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/appointments/add', this.formModel)
      .subscribe((res: any) => {
        if (res?.status != '203') {
          alert('Đặt lịch thành công');
          window.location.href = '/';
        } else {
          alert(res?.message);
        }
      });
  }

  private addScriptToBody(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    this.renderer.appendChild(document.body, script);
  }
}
