import { TableActionBtn } from './../../shared/components/table/TableActionBtn';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationParam } from 'src/app/_entities/PaginationParam';
import { PlanService } from 'src/app/_services/plan.service';
import { TableColumn } from 'src/app/shared/components/table/TableColumn';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyFormatPipe } from 'src/app/_pipes/currency-format-pipe';
import { CheckActivationIconPipe } from 'src/app/_pipes/check-activation-icon-pipe';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { UpdatePlanComponent } from 'src/app/shared/components/update-plan/update-plan.component';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Plan } from 'src/app/_entities/Plan';
import { IPageEvent } from 'src/app/_entities/IPageEvent';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent implements OnInit {
  @ViewChild('PlanListTable') table: ElementRef;
  public planList: any[] = [];
  public planListTableColumns: TableColumn[];
  public planListTableActions: TableActionBtn[];
  private PaginationParam = new PaginationParam();
  public dataRecieved: boolean = false;
  public pageLength: number;
  public pageIndex: number;

  constructor(
    private planService: PlanService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public currencyFormat: CurrencyFormatPipe
  ) {}

  openDialog() {
    // to do
  }

  ngOnInit(): void {
    this.planListTableActions = [
      {
        BtnClass: 'fa fa-edit',
        BtnTitle: '',
        BtnTooltip: 'ویرایش',
        BtnAction: 'Edit',
      },
      {
        BtnClass: 'fa fa-trash',
        BtnTitle: '',
        BtnTooltip: 'حذف',
        BtnAction: 'Delete',
      },
    ];
    this.initializePlanListColumns();
    this.getPlanList();
  }

  initializePlanListColumns(): void {
    this.planListTableColumns = [
      {
        name: 'طرح',
        dataKey: 'title',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'سقف ثبت نام',
        dataKey: 'registerCount',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'حداقل مبلغ تسهیلات',
        dataKey: 'minAmount',
        position: 'left',
        isSortable: true,
        pipe: CurrencyFormatPipe,
      },
      {
        name: 'حداکثر مبلغ تسهیلات',
        dataKey: 'maxAmount',
        position: 'left',
        isSortable: true,
        pipe: CurrencyFormatPipe,
      },
      {
        name: 'ضریب',
        dataKey: 'ratio',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'قرارداد',
        dataKey: 'hasContract',
        position: 'left',
        isSortable: true,
        pipe: CheckActivationIconPipe,
      },
      {
        name: 'فعال',
        dataKey: 'isActive',
        position: 'left',
        isSortable: true,
        pipe: CheckActivationIconPipe,
      },
      {
        name: 'ارجاع توسط ادمین',
        dataKey: 'isAdminReferral',
        position: 'left',
        isSortable: true,
        pipe: CheckActivationIconPipe,
      },
    ];
  }

  getPlanList(): any[] {
    this.dataRecieved = false;
    this.PaginationParam.pageNumber = 1;
    this.PaginationParam.pageSize = 10;
    return [
      this.planService.GetPlanListByPagination(this.PaginationParam).subscribe(
        (res) => {
          this.planList = res.value.items;
          this.pageLength = res.value.totalCount;
          this.pageIndex = res.value.pageNumber;
          this.dataRecieved = true;
        },
        (error) => {
          this.dataRecieved = false;
        }
      ),
    ];
  }

  sortPlanListData(sortParameters: Sort) {
    if (this.planList.length > 0) {
      const keyName = sortParameters.active;
      let firstValue = this.planList[0][keyName];
      if (sortParameters.direction === 'asc') {
        if (Number.isInteger(firstValue)) {
          this.planList = this.planList.sort(
            (a: Plan, b: Plan) => a[keyName] - b[keyName]
          );
        } else {
          this.planList = this.planList.sort((a: Plan, b: Plan) =>
            a[keyName].toString().localeCompare(b[keyName].toString())
          );
        }
      } else if (sortParameters.direction === 'desc') {
        if (Number.isInteger(firstValue)) {
          this.planList = this.planList.sort(
            (a: Plan, b: Plan) => b[keyName] - a[keyName]
          );
        } else {
          this.planList = this.planList.sort((a: Plan, b: Plan) =>
            b[keyName].toString().localeCompare(a[keyName].toString())
          );
        }
      } else {
        return (this.planList = this.getPlanList());
      }
    }
    return null;
  }

  actionBtnCallback(btn: any) {
    if (btn.btn.BtnAction == 'Edit') {
      let refDialog = this.dialog.open(UpdatePlanComponent, {
        data: { datakey: btn.element.id },
        panelClass: 'update-plan-dialog',
      });
      refDialog.afterClosed().subscribe((res) => {
        this.getPlanList();
        return;
      });
    } else if (btn.btn.BtnAction == 'Delete') {
      this.dialog
        .open(ConfirmationDialogComponent, {
          data: `آیا از انجام این عملیات اطمینان دارید؟`,
        })
        .afterClosed()
        .subscribe((accepted: Boolean) => {
          if (accepted) {
            this.planService.DeletePlan(btn.element.id).subscribe(
              (suc) => {
                this.getPlanList();
                return;
              },
              (err) => {
                this.getPlanList();
                return;
              }
            );
          }
        });
    }
  }

  paginationChanged(pageInfo: IPageEvent) {
    this.PaginationParam.pageSize = pageInfo.pageSize;
    this.PaginationParam.pageNumber = pageInfo.pageIndex + 1;
    this.planService.GetPlanListByPagination(this.PaginationParam).subscribe(
      (suc) => {
        this.planList = suc.value.items;
        this.pageLength = suc.value.totalCount;
        this.pageIndex = suc.value.pageNumber;
      },
      (err) => {
        //  this.openMessageBox(Buttons.Ok, "خطا", err);
      }
    );
  }
}
