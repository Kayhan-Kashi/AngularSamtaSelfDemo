import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Roles } from '../_entities/userRole';
import { ListItems } from '../_entities/Response';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private http: HttpClient) {}

  GetFirmUserHistory() {
    return JSON.parse(localStorage.getItem('FirmUserHistory')!);
  }

  SetFirmUserHistory(data) {
    localStorage.setItem('FirmUserHistory', data);
  }

  RemoveFirmUserHistory() {
    localStorage.removeItem('FirmUserHistory');
  }

  GetCurrentuser(): any {
    return JSON.parse(localStorage.getItem(environment.currentUser)!);
  }

  SetCurrentuser(data: any) {
    localStorage.setItem(environment.currentUser, data);
  }

  RemoveCurrentuser() {
    localStorage.removeItem(environment.currentUser);
  }

  GetAccessToken() {
    return JSON.parse(localStorage.getItem('access_token')!);
  }

  SetAccessToken(data) {
    localStorage.setItem('access_token', data);
  }

  RemoveAccessToken() {
    localStorage.removeItem('access_token');
  }

  //User Roles data
  GetUserRolesData(): Array<Roles> {
    var d = new Array<Roles>();
    d = JSON.parse(localStorage.getItem(environment.userRoles)!);
    return d;
  }

  SetUserRolesData(data: ListItems<Roles>) {
    localStorage.setItem(environment.userRoles, JSON.stringify(data));
  }

  RemoveUserRolesData() {
    localStorage.removeItem(environment.userRoles);
  }

  RemoveUserFullNameData() {
    localStorage.removeItem(environment.userFullName);
  }

  RemoveUserBranchData() {
    localStorage.removeItem(environment.userBranch);
  }
}
