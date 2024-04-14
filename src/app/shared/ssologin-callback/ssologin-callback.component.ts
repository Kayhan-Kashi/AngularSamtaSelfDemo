import { LocalStorageService } from './../../_services/LocalStorage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-ssologin-callback',
  templateUrl: './ssologin-callback.component.html',
  styleUrls: ['./ssologin-callback.component.css'],
})
export class SSOLoginCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    let token = this.route.snapshot.queryParams['token'];
    let returnUrl = this.route.snapshot.queryParams['optionalparameter'];
    this.localStorageService.SetCurrentuser('{"token" : "' + token + '"}');
    this.authenticationService.updateUser();
    this.userService.getUserRoles().subscribe(
      (res) => {
        this.localStorageService.SetUserRolesData(res.value);
        this.router.navigate([returnUrl]);
      },
      (err) => {
        this.authenticationService.logout();
        this.router.navigate([returnUrl]);
      }
    );
  }
}
