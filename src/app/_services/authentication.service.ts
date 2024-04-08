import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Roles } from '../_entities/userRole';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './LocalStorage.service';
import { BaseResponse } from '../_entities/Response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private rolesSubject: BehaviorSubject<Array<Roles>>;
  public roles: Observable<Array<Roles>>;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      this.localStorageService.GetCurrentUser()
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.rolesSubject = new BehaviorSubject<Array<Roles>>(
      this.localStorageService.GetUserRolesData()
    );
    this.roles = this.rolesSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  logout() {
    this.localStorageService.RemoveCurrentuser();
    this.localStorageService.RemoveUserRolesData();
    this.localStorageService.RemoveUserFullNameData();
    this.localStorageService.RemoveUserBranchData();
    this.localStorageService.RemoveUserRolesData();
    this.currentUserSubject.next(null);
    this.rolesSubject.next(<any>null);
  }

  checkAuthentication(): Observable<BaseResponse<any>> {
    return this.httpClient.get<BaseResponse<any>>(
      environment.apiUrl + '/api/User/CheckAuthentication'
    );
  }
}
