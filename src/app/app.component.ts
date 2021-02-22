import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  ngOnInit() {
    console.log("app_component_ts==>ngoInit")
    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
      console.log("app_component_ts==>ngoInit==>if");

    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
       console.log("app_component_ts==>ngoInit==>else");
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
      console.log("app_components_ts=>Hostliserner=>if");
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
      console.log("app_components_ts=>Hostliserner=>else");
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
      console.log("Hostlistener=>isBiggerScreen=>if");
    } else {
      return false;
      console.log("Hostlistener=>isBiggerScreen=>else");
    }
  }
}
