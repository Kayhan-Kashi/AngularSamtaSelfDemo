import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../_entities/Response';
import { Observable, map, of, tap } from 'rxjs';
import { Roles } from '../_entities/userRole';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './LocalStorage.service';
import { APIResponse } from '../_entities/apiResponse';
import { UserInfo } from '../_entities/userInfo';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getUserRoles(): Observable<BaseResponse<Roles>> {
    return this.http.get<BaseResponse<Roles>>(
      `${environment.apiUrl}/api/User/GetUserRoles`
    );
  }

  getUserInfo() {
    return this.http.get<any>(`${environment.apiUrl}/api/User/GetUserInfo`);
  }

  getUserData(): Observable<UserInfo> {
    let localUser: UserInfo = this.localStorageService.getLocalUser();
    if (localUser && localUser.fullName != '') {
      return of<UserInfo>(localUser);
    } else {
      return this.http
        .get<APIResponse<UserInfo>>(
          `${environment.apiUrl}/api/User/GetUserInfo`
        )
        .pipe(
          map((userInfo) => {
            this.localStorageService.setLocalUserFullName(
              userInfo.value.fullName!
            );
            this.localStorageService.setLocalUserBranch(
              userInfo.value.branchCode!
            );
            return userInfo.value;
          })
        );
    }
  }
}
