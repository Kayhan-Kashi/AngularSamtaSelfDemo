import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeData } from 'src/app/shared/utilities/routes';

@Component({
  selector: 'app-system-management',
  templateUrl: './system-management.component.html',
  styleUrls: ['./system-management.component.css'],
})
export class SystemManagementComponent implements OnInit {
  @Input() public items: any;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.items = TreeData[0].children;
  }
  openWindow(item: any): void {
    this.router.navigate([item.url]);
  }
}
