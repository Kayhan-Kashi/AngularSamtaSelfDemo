import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './LocalStorage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Roles } from '../_entities/userRole';
import { BaseResponse } from '../_entities/Response';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private rolesSubject: BehaviorSubject<Array<Roles>>;
  public roles: Observable<Array<Roles>>;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      this.localStorageService.GetCurrentuser()
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.rolesSubject = new BehaviorSubject<Array<Roles>>(
      this.localStorageService.GetUserRolesData()
    );
    this.roles = this.rolesSubject.asObservable();
  }

  public updateUser() {
    this.currentUserSubject.next(this.localStorageService.GetCurrentuser());
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // login(data:any) {

  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.post<any>(`${environment.apiUrl}api/v1/user/authenticate`, data, httpOptions);
  // }

  logout() {
    this.localStorageService.RemoveCurrentuser();
    this.localStorageService.RemoveUserRolesData();
    this.localStorageService.RemoveUserFullNameData();
    this.localStorageService.RemoveUserBranchData();
    this.localStorageService.RemoveUserRolesData();
    this.currentUserSubject.next(null);
    this.rolesSubject.next(null!);
  }
  checkAuthentication(): Observable<BaseResponse<any>> {
    return this.httpClient.get<BaseResponse<any>>(
      environment.apiUrl + '/api/User/CheckAuthentication'
    );
  }
}
