import { Component, Input, OnInit } from '@angular/core';
import { TreeData } from '../../utilities/routes';
import { Router } from '@angular/router';
import { MenuNode } from 'src/_entities/menuNode';

@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
})
export class HorizontalMenuComponent implements OnInit {
  public items: any;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.items = TreeData;
    this.items = this.items.filter((x) => this.checkMenuAccess(x));
  }

  checkMenuAccess(node: MenuNode) {
    return true;
  }

  openWindow(item: any): void {
    this.router.navigate(item.url);
  }
}
