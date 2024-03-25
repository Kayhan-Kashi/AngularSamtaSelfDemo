import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { MenuNode } from 'src/_entities/menuNode';
import { TreeData } from '../../utilities/routes';

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  url: string;
  icon: string;
  singlePathName: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() public sidebarHide = new EventEmitter<any>();
  @Input() public displayside: boolean = true;

  constructor() {
    this.dataSource.data = TreeData;
  }

  private _transformer = (node: MenuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      url: node.url,
      icon: node.icon,
      singlePathName: node.singlePathName,
      availableForPermisions: node.availableForPermisions,
    };
  };

  public treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  public treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    <any>this.treeFlattener
  );

  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit(): void {}

  myCloseEvent(): void {
    this.sidebarHide.emit();
  }
}
