import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

declare let $: any; // Import jQuery
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  listServices: any = [];
  @Input() showPageHeader: any = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // const head = document.getElementsByTagName('head')[0];
    //
    // // Thêm các thẻ link và script mới vào head
    // const metaTags: any = [
    //   {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    //   {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true},
    //   {
    //     href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Roboto:wght@500;700;900&display=swap',
    //     rel: 'stylesheet'
    //   },
    //   {href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css', rel: 'stylesheet'},
    //   {href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css', rel: 'stylesheet'},
    //   {href: '/assets/lib/animate/animate.min.css', rel: 'stylesheet'},
    //   {href: '/assets/lib/owlcarousel/assets/owl.carousel.min.css', rel: 'stylesheet'},
    //   {href: '/assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css', rel: 'stylesheet'},
    //   {href: '/assets/css/bootstrap.min.css', rel: 'stylesheet'},
    //   {href: '/assets/css/style.css', rel: 'stylesheet'},
    // ];
    //
    // metaTags.forEach((tag: any) => {
    //   const newTag = document.createElement('link');
    //   Object.keys(tag).forEach(key => {
    //     newTag.setAttribute(key, tag[key]);
    //   });
    //   head.appendChild(newTag);
    // });

    this.http.get('http://localhost:8080/BE-Project17-1.0-SNAPSHOT/api/services/getAll')
      .subscribe((res: any) => {
        if(res?.status != '203') {
          this.listServices = res;
        }
      });
  }

}
