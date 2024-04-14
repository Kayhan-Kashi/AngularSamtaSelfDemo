import { LocalStorageService } from './../../../_services/LocalStorage.service';
import { UserService } from 'src/app/_services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuNode } from 'src/_entities/menuNode';
import { TreeData } from '../../utilities/routes';
import * as moment from 'jalali-moment';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services/authentication.service';

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
  public currentDate: string;
  public branchCode: string;
  public loginUser: string;
  public remainMin: any = 0;
  public remainSec: any = 0;
  public refreshTokenTimeout: any;

  constructor(
    location: Location,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService
  ) {
    this.location = location;
    this.localStorageService = localStorageService;
    this.authenticationService = authenticationService;
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.startRefreshTokenTimer();
    }, 1000);
  }

  ngOnInit(): void {
    this.getUserInfo();
    this.currentDate = this.convertToPersianDate(new Date());
    this.listTitles = TreeData;
    this.getTitle();
    this.startRefreshTokenTimer();
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

    //
    //
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

  convertToPersianDate(date: Date): string {
    return moment(date).locale('fa').format('YYYY/M/D');
  }

  getUserInfo() {
    let userInfo = localStorage.getItem(environment.userFullName);
    if (userInfo == null || userInfo == '') {
      this.userService.getUserInfo().subscribe(
        (res) => {
          localStorage.setItem(environment.userFullName, res.value.fullName);
          localStorage.setItem(environment.userBranch, res.value.branchCode);
          this.ngOnInit();
        },
        (err) => {}
      );
    } else {
      this.loginUser = localStorage.getItem(environment.userFullName)!;
      this.branchCode = localStorage.getItem(environment.userBranch)!;
    }
  }

  startRefreshTokenTimer() {
    let timeout = 0;
    var currentUser = this.localStorageService.GetCurrentuser();
    if (currentUser) {
      const jwtToken = JSON.parse(atob(currentUser.token.split('.')[1]));
      if (jwtToken) {
        const expires = new Date(jwtToken.exp * 1000);
        timeout = expires.getTime() - Date.now();
        this.remainMin = this.zeroPad(
          Math.floor((timeout % (1000 * 60 * 60)) / (1000 * 60)),
          2
        );
        this.remainSec = this.zeroPad(
          Math.floor((timeout % (1000 * 60)) / 1000),
          2
        );
      }
    }
    this.refreshTokenTimeout = setTimeout(() => this.logout(), timeout);
  }

  zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }

  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/Dashboard']);
  }

  onSubmit() {
    window.location.href = 'https://bs.ba24.ir/sata/Interanet';
  }
}
