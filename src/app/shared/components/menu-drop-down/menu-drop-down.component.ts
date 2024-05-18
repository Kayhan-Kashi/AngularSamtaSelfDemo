import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MenuListItem } from './MenuListItem';

@Component({
  selector: 'app-menu-drop-down',
  templateUrl: './menu-drop-down.component.html',
  styleUrls: ['./menu-drop-down.component.css'],
})
export class MenuDropDownComponent {
  @Input() menuListItems: MenuListItem[] = [];
  @Input() menuLabel: string;
  @Input() menuIcon: string;
  @Output() clickMenuItemAction: EventEmitter<any> = new EventEmitter<any>();

  public clickMenuItem(menuItem: MenuListItem) {
    this.clickMenuItemAction.emit(menuItem);
  }
}
