import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'jalali-moment';
import { CheckRolesHelper } from 'src/app/_helpers/check-roles-helper';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public currentDate: string;
  public branchCode: string;
  public loginUser: string;
  public userFullname: string;
  public Branch: string;
  public adminAccess: boolean = false;
  public adminRoles: Array<string> = ['Admin_View'];

  constructor(
    public router: Router,
    private userService: UserService,
    private checkRoles: CheckRolesHelper
  ) {}

  ngOnInit(): void {
    this.adminAccess = this.checkRoles.CheckRole(this.adminRoles);
    this.getUserInfo();
    this.currentDate = this.convertToPersianDate(new Date());
  }

  // getUserInfo() {
  //   this.userService.getUserInfo().subscribe(
  //     (res) => {
  //       if (res && res.successes) {
  //         this.userFullname = res.value.fullName;
  //         this.Branch = res.value.branchCode;
  //       }
  //     },
  //     (err) => {}
  //   );
  // }

  getUserInfo() {
    this.userService.getUserData().subscribe(
      (res) => {
        if (res.fullName != '') {
          this.userFullname = res.fullName;
          this.Branch = res.branchCode;
        }
      },
      (err) => {}
    );
  }

  convertToPersianDate(date: Date): string {
    return moment(date).locale('fa').format('YYYY/M/D');
  }

  openWindow(item: string): void {
    this.router.navigate([item]);
  }
}
