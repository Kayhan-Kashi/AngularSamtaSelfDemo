import {
  ChangeDetectorRef,
  Component,
  HostListener,
  NgZone,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css'],
})
export class DefaultLayoutComponent implements OnInit {
  public innerHeight: any;
  public isSidebarActive: boolean = false;
  public isSidebarHide: boolean = false;
  public branchCode: string;
  public loginUser: string;
  public loginUserBehaviour = new BehaviorSubject<string>('');
  public branchCodeBehaviour = new BehaviorSubject<string>('');

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.innerHeight = window.innerHeight - 415;
  }
  handleShowSidebar() {
    this.isSidebarActive = true;
    this.isSidebarHide = false;
  }

  handleHideSidebar() {
    this.isSidebarHide = true;
    this.isSidebarActive = false;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight - 415;
  }
}
