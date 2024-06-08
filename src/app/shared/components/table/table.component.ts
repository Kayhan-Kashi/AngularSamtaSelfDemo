import { TableMenuDropDown } from './TableMenuDropDown';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MenuListItem } from '../menu-drop-down/MenuListItem';
import { TableColumn } from './TableColumn';
import { TableActionBtn } from './TableActionBtn';
import { IPageEvent } from 'src/app/_entities/IPageEvent';

@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  public tableDataSource = new MatTableDataSource<any>([]);
  public displayedColumns: string[];
  public selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  menuListItems: MenuListItem[];
  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[] = [];
  @Input() rowActionIcon: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];
  @Input() isSelectAble: boolean = false;
  @Input() rowIndexColumn: string;
  @Input() tableMenuDropDown: TableMenuDropDown;
  @Input() paginationLength: number;
  @Input() actionBtns: TableActionBtn[] = [];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() menuAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowItemSelectedEmitter: EventEmitter<any> = new EventEmitter();
  @Output() paginationInfoEmitter: EventEmitter<PageEvent> = new EventEmitter();
  @Output() actionButtonEmmiter: EventEmitter<any> = new EventEmitter();

  public pageIndex: number = 0;
  public pageSize: number = this.defaultPageSize;

  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
    this.selection.clear();
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.matPaginator._intl.firstPageLabel = 'صفحه اول';
    this.matPaginator._intl.itemsPerPageLabel = 'تعداد آیتم ها در هر صفحه';
    this.matPaginator._intl.lastPageLabel = 'صفحه آخر';
    this.matPaginator._intl.nextPageLabel = 'صفحه بعدی';
    this.matPaginator._intl.previousPageLabel = 'صفحه قبلی';
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map(
      (tableColumn: TableColumn) => tableColumn.name
    );

    this.displayedColumns = columnNames.reverse();

    if (this.rowActionIcon) {
      this.displayedColumns.push(this.rowActionIcon);
    }

    if (this.rowIndexColumn) {
      this.displayedColumns.push(this.rowIndexColumn);
    }

    if (this.isSelectAble) this.displayedColumns.push('select');

    if (this.tableMenuDropDown?.menuItemList?.length) {
      this.displayedColumns.splice(
        this.tableMenuDropDown.columnIndex,
        0,
        'menuDropDown'
      );
    }

    if (this.actionBtns && this.actionBtns.length > 0) {
      this.displayedColumns.push('actions');
    }
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find(
      (column) => column.name === sortParameters.active
    )?.dataKey!;
    this.sort.emit(sortParameters);
  }

  emitRowAction(row: any) {
    this.rowAction.emit(row);
  }

  clickMenuItem(menuItemClicked: MenuListItem, row: any) {
    let obj: any = {
      menuItme: menuItemClicked,
      rowItem: row,
    };
    this.menuAction.emit(obj);
  }

  emitRowItemSelected() {
    let rows = this.selection.selected;
    this.rowItemSelectedEmitter.emit(rows);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.emitRowItemSelected();
      return;
    }
    this.selection.select(...this.tableDataSource.data);
    this.emitRowItemSelected();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  checkBoxChange(eve: Event, row?: any) {
    let isChecked = (<HTMLInputElement>eve.target).checked;
    if (isChecked) {
      this.selection.select(row);
      this.emitRowItemSelected();
    }
  }

  emitPaginationInfo(eventPageInfo: IPageEvent) {
    this.pageSize = eventPageInfo.pageSize;
    this.pageIndex = eventPageInfo.pageIndex;
    this.paginationInfoEmitter.emit(eventPageInfo);
  }

  actionButtonClick(btn, element) {
    let obj = {
      btn: btn,
      element: element,
    };
    this.actionButtonEmmiter.emit(obj);
  }

  reload() {
    let pageInfo = {
      pageIndex: this.matPaginator.pageIndex,
      pageSize: this.matPaginator.pageSize,
      length: this.matPaginator.length,
    };
    this.pageSize = pageInfo.pageSize;
    this.pageIndex = pageInfo.pageIndex;
    this.paginationInfoEmitter.emit(pageInfo);
  }
}
