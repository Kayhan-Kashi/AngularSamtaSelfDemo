import { Permission } from '../_entities/permission';
import { LocalStorageService } from './../_services/LocalStorage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckRolesHelper {
  constructor(private localStorageService: LocalStorageService) {}

  public CheckRole(roles: Array<string>): boolean {
    let permissions = this.localStorageService.GetUserRolesData();
    var permitionAll = roles.find((x) => x.toLowerCase() == 'all');
    if (permitionAll) {
      return true;
    } else {
      var items: Array<Permission> = [];
      roles.forEach((x) => {
        permissions.forEach((y) => {
          let item = y.permissions!.find((z) => z.name == x);
          if (item) {
            items.push(item);
          }
        });
      });
      if (items.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
}
