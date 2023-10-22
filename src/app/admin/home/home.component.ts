import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalUser: any;
  totalService: any;
  totalAppointment: any;
  totalMedicalRecord: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/dashboard')
      .subscribe({
        next: (response: any) => {
          if (response && response?.status != '203') {
            this.totalUser = response.totalUser;
            this.totalService = response.totalService;
            this.totalAppointment = response.totalAppointment;
            this.totalMedicalRecord = response.totalMedicalRecord;
          }
        }
      });
  }

}
