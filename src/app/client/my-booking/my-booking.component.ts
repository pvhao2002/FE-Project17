import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {

  listMyBooking: any = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user?.username) {
      this.http.get('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/appointments/getAllMyAppointment/' + user?.id)
        .subscribe((res: any) => {
          console.log(res);
          if (res?.status != '203') {
            this.listMyBooking = res;
          }
        });
    }
  }

  cancel(id: any): void {
    const cancel = confirm('Bạn có chắc chắn muốn hủy lịch hẹn này?');
    if (cancel) {
      const item = {status: 'cancel', id};
      this.http.patch('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/appointments/cancel', item)
        .subscribe((res: any) => {
          if (res?.status != '203') {
            alert('Hủy thành công');
            window.location.reload();
          }
        });
    }
  }
}
