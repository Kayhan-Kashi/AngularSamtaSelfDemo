import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private returnUrl: string;

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let currentUser: any = this.authenticationService.currentUserValue;

    if (!currentUser) {
      var userStr = localStorage.getItem(environment.currentUser);
      if (userStr && userStr.length > 0) {
        currentUser = JSON.parse(
          localStorage.getItem(environment.currentUser)!
        );
      }
    }

    if (currentUser) {
      const token = currentUser.token;
      if (!this.jwtHelper.isTokenExpired(token)) {
        return this.authenticationService.checkAuthentication().pipe(
          map((e) => {
            if (e) {
              return true;
            } else {
              return false;
            }
          }),
          catchError((err) => {
            this.authenticationService.logout();
            this.redirectToLogin(state.url);
            return of(false);
          })
        );
      } else {
        this.redirectToLogin(state.url);
        return of(false);
      }
    } else {
      this.redirectToLogin(state.url);
      return of(false);
    }
  }

  redirectToLogin(url: string) {
    let uri =
      '?returnUrl=' +
      window.location.origin +
      environment.subAppUrl +
      '/LoginCallback&tokenbase=true&&optionalparameter=' +
      url;
    window.location.href = environment.ssoUrl + uri;
  }
}
