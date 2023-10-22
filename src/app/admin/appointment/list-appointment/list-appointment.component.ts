import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.css']
})
export class ListAppointmentComponent implements OnInit {
  listAppointment: any = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/appointments/getAll')
      .subscribe((res: any) => {
        console.log(res)
        if (res?.status != '203') {
          this.listAppointment = res;
        }
      });
  }

  accept(id: any) {
    const data = {
      status: 'accepted',
      id
    };
    this.http.patch('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/appointments/update', data)
      .subscribe((res: any) => {

      });
  }

  deny(id: any) {
    const data = {
      status: 'rejected',
      id
    }
    this.http.patch('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/appointments/update', data)
      .subscribe((res: any) => {

      });
  }

  classButton(status: any) {
    switch (status) {
      case 'accepted':
        return 'bg-gradient-success';
      case 'rejected':
        return 'bg-gradient-danger';
      default:
        return 'bg-gradient-warning';
    }
  }

  protected readonly statusbar = statusbar;
}
