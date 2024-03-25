import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuNode } from 'src/_entities/menuNode';
import { TreeData } from '../../utilities/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public showSidebar = new EventEmitter<any>();
  @Input() sidebarHide: boolean = false;
  public location: Location;
  public navigator: MenuNode[] = [];
  private listTitles: any[] = [];

  constructor(location: Location, private router: Router) {
    this.location = location;
  }

  ngOnInit(): void {
    this.listTitles = TreeData;
    this.getTitle();
  }

  setSidebarVisible(): any {
    this.showSidebar.emit();
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee.toLocaleLowerCase();
    let routes = titlee.split('/').slice(1);
    var x = this.flatten(this.listTitles, false);

    routes.forEach((routeItem) => {
      let item = this.listTitles.find(
        (x) => x.singlePathName.toLowerCase() == routeItem.toLowerCase()
      );
      this.navigator.push(item);
    });

    // for(var item = 0; item < this.listTitles.length; item++){
    //     if(this.listTitles[item].url.toLowerCase() === titlee){
    //         return this.listTitles[item].title;
    //     }
    // }

    return 'داشبورد';
  }

  flatten(array, mutable) {
    var toString = Object.prototype.toString;
    var arrayTypeStr = '[object Array]';

    var result = [];
    var nodes = (mutable && array) || array.slice();
    var node;

    if (!array.length) {
      return result;
    }

    node = nodes.pop();

    do {
      if (toString.call(node) === arrayTypeStr) {
        nodes.push.apply(nodes, node);
      } else {
        result.push(<never>node);
      }
    } while (nodes.length && (node = nodes.pop()) !== undefined);

    result.reverse(); // we reverse result to restore the original order
    return result;
  }
}
