import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../_entities/Response';
import { Observable } from 'rxjs';
import { Roles } from '../_entities/userRole';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserRoles(): Observable<BaseResponse<Roles>> {
    return this.http.get<BaseResponse<Roles>>(
      `${environment.apiUrl}/api/User/GetUserRoles`
    );
  }

  getUserInfo() {
    return this.http.get<any>(`${environment.apiUrl}/api/User/GetUserInfo`);
  }
}
