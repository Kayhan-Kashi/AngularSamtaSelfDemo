import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Roles } from '../_entities/userRole';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  GetFirmUserHistory() {
    return JSON.parse(<string>localStorage.getItem('FirmUserHistory'));
  }

  SetFirmUserHistory(data) {
    localStorage.setItem('FirmUserHistory', data);
  }

  RemoveFirmUserHistory() {
    localStorage.removeItem('FirmUserHistory');
  }

  GetCurrentUser(): any {
    return JSON.parse(<string>localStorage.getItem(environment.currentUser));
  }

  SetCurrentuser(data: any) {
    localStorage.setItem(environment.currentUser, data);
  }

  RemoveCurrentuser() {
    localStorage.removeItem(environment.currentUser);
  }

  GetAccessToken() {
    return JSON.parse(<string>localStorage.getItem('access_token'));
  }

  SetAccessToken(data) {
    localStorage.setItem('access_token', data);
  }

  RemoveAccessToken() {
    localStorage.removeItem('access_token');
  }

  GetUserRolesData(): Array<Roles> {
    var d = new Array<Roles>();
    d = JSON.parse(<string>localStorage.getItem(environment.userRoles));
    return d;
  }

  SetUserRolesData(roles: Array<Roles>) {
    localStorage.setItem(environment.userRoles, JSON.stringify(roles));
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
