import { MenuListItem } from '../menu-drop-down/MenuListItem';

export interface TableMenuDropDown {
  menuItemList: MenuListItem[];
  menuLabel: string;
  menuIcon: string;
  columnIndex: number;
}
