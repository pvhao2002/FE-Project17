import {Component, OnInit, Renderer2} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

declare let $: any; // Import jQuery
@Component({
  selector: 'client-root',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {

  constructor(private meta: Meta, private title: Title, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.removeExistingMetaTags();
    this.addNewMetaTags();

    this.addScriptToBody('https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js');
    this.addScriptToBody('../../assets/lib/wow/wow.min.js');
    this.addScriptToBody('../../assets/lib/easing/easing.min.js');
    this.addScriptToBody('../../assets/lib/waypoints/waypoints.min.js');
    this.addScriptToBody('../../assets/lib/counterup/counterup.min.js');

    this.addScriptToBody('../../assets/lib/owlcarousel/owl.carousel.min.js');
    this.addScriptToBody('../../assets/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js');
    this.addScriptToBody('../../assets/js/main.js');

    //   set active class on navbar
    const url = window.location.href;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link: any) => {
      if (url === link.href) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  private removeExistingMetaTags() {
    const head = document.getElementsByTagName('head')[0];
    const links = head.querySelectorAll('link');
    const scripts = head.querySelectorAll('script');
    links.forEach(link => {
      head.removeChild(link);
    });
    scripts.forEach(script => {
      head.removeChild(script);
    });
  }

  private addNewMetaTags() {
    const head = document.getElementsByTagName('head')[0];

    // Thêm các thẻ link và script mới vào head
    const metaTags: any = [
      {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true},
      {
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Roboto:wght@500;700;900&display=swap',
        rel: 'stylesheet'
      },
      {href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css', rel: 'stylesheet'},
      {href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css', rel: 'stylesheet'},
      {href: '/assets/lib/animate/animate.min.css', rel: 'stylesheet'},
      {href: '/assets/lib/owlcarousel/assets/owl.carousel.min.css', rel: 'stylesheet'},
      {href: '/assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css', rel: 'stylesheet'},
      {href: '/assets/css/bootstrap.min.css', rel: 'stylesheet'},
      {href: '/assets/css/style.css', rel: 'stylesheet'},
    ];

    metaTags.forEach((tag: any) => {
      const newTag = document.createElement('link');
      Object.keys(tag).forEach(key => {
        newTag.setAttribute(key, tag[key]);
      });
      head.appendChild(newTag);
    });
  }

  private addScriptToBody(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    this.renderer.appendChild(document.body, script);
  }
}
