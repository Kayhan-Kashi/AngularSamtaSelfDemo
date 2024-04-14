import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser: any;
    // this.authenticationService.updateUser();
    currentUser = this.authenticationService.currentUserValue;
    // if (!currentUser) {
    //   var userStr = localStorage.getItem(environment.currentUser);
    //   if (userStr && userStr.length > 0) {
    //     currentUser = JSON.parse(userStr);
    //   }
    // }
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
    } else {
    }

    return next.handle(request);
  }
}
