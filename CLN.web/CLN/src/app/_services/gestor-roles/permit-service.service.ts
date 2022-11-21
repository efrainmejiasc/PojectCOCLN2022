import { Injectable } from '@angular/core';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';

@Injectable({
  providedIn: 'root'
})
export class PermitServiceService {

  constructor() { }

  public fetchPermits(data) {
    var permitsUser: permitsUserFetch = new permitsUserFetch();
    data.forEach(permits => {
      (permits.index == 1) ? permitsUser.canCreate = true : "";
      (permits.index == 2) ? permitsUser.canEdit = true : "";
      (permits.index == 3) ? permitsUser.canDelete = true : "";
      (permits.index == 4) ? permitsUser.canActive = true : "";
      (permits.index == 5) ? permitsUser.other = true : "";
      (permits.index == 6) ? permitsUser.canView = true : "";
      if (permits.index == 7) {
        permitsUser.canCreate = true;
        permitsUser.canEdit = true;
        permitsUser.canActive = true;
      }
      else if (permits.index === 8) {
        permitsUser.canEdit = true;
        permitsUser.canCreate = true;
        permitsUser.canDelete = true;
        permitsUser.canActive = true;
        permitsUser.other = true;
        permitsUser.canView = true;
      }
      else if (permits.index === 9) {
        permitsUser.canEdit = true;
        permitsUser.canCreate = true;
        permitsUser.canDelete = true;
        permitsUser.other = true;
        permitsUser.canView = true;
      }
    })
    return permitsUser;
  }
}
