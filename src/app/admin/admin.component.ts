import {Component, OnInit, Renderer2} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentYear = new Date().getFullYear();
  index: any = 1;

  constructor(private meta: Meta, private title: Title, private renderer: Renderer2) {
  }

  logout(): void {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  ngOnInit(): void {
    document.body.className = 'g-sidenav-show bg-gray-200';

    this.title.setTitle('Admin - Project 17');
    this.meta.updateTag({charset: 'utf-8'});
    this.meta.updateTag({name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'});

    // Xóa các thẻ link và script hiện có trong head
    this.removeExistingMetaTags();

    // Thêm các thẻ link và script mới vào head
    this.addNewMetaTags();


    this.addScriptToBody('/assets/js/core/popper.min.js');
    this.addScriptToBody('/assets/js/core/bootstrap.min.js');
    this.addScriptToBody('/assets/js/plugins/perfect-scrollbar.min.js');
    this.addScriptToBody('/assets/js/plugins/smooth-scrollbar.min.js');

    // The JavaScript code
    const script = this.renderer.createElement('script');
    script.text = `
    var win = navigator.platform.indexOf('Win') > -1;
    if (win && document.querySelector('#sidenav-scrollbar')) {
      var options = {
        damping: '0.5'
      };
      Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
    }
  `;
    this.renderer.appendChild(document.body, script);

    // Add the GitHub buttons script
    this.addScriptToBody('https://buttons.github.io/buttons.js');

    // Add the Material Dashboard script
    this.addScriptToBody('/assets/js/material-dashboard.min.js?v=3.1.0');

    // set current tab is active
    const url = window.location.href.toString();
    if (url.includes('user')) {
      this.index = 2;
    } else if (url.includes('service')) {
      this.index = 3;
    } else if (url.includes('room')) {
      this.index = 4;
    } else if (url.includes('booking')) {
      this.index = 5;
    } else {
      this.index = 1;
    }
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
      {rel: 'apple-touch-icon', sizes: '76x76', href: '/assets/img/apple-icon.png'},
      {rel: 'icon', type: 'image/png', href: '/assets/img/favicon.png'}
    ];

    metaTags.forEach((tag: any) => {
      const newTag = document.createElement('meta');
      Object.keys(tag).forEach(key => {
        newTag.setAttribute(key, tag[key]);
      });
      head.appendChild(newTag);
    });

    const linkTags = [
      'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700',
      '/assets/css/nucleo-icons.css',
      '/assets/css/nucleo-svg.css',
      'https://fonts.googleapis.com/icon?family=Material+Icons+Round',
      '/assets/css/material-dashboard.css?v=3.1.0',
    ];

    linkTags.forEach(tag => {
      const newTag = document.createElement('link');
      newTag.setAttribute('rel', 'stylesheet');
      newTag.setAttribute('href', tag);
      head.appendChild(newTag);
    });


    const scriptTags = [
      'https://kit.fontawesome.com/42d5adcbca.js'
    ];

    scriptTags.forEach(tag => {
      const newTag = document.createElement('script');
      newTag.setAttribute('src', tag);
      head.appendChild(newTag);
    });
  }

  private addScriptToBody(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    this.renderer.appendChild(document.body, script);
  }
}
