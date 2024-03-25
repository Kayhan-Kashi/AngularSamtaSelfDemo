import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css'],
})
export class DefaultLayoutComponent implements OnInit {
  public innerHeight: any;
  public isSidebarActive: boolean = false;
  public isSidebarHide: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.innerHeight = window.innerHeight - 415;
  }
  handleShowSidebar() {
    this.isSidebarActive = true;
    this.isSidebarHide = false;
  }
  handleHideSidebar() {
    this.isSidebarHide = true;
    this.isSidebarActive = false;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight - 415;
  }
}
