import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthServicios implements CanActivate {

  constructor(private router:Router){}

  canActivate(): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{

      if(  environment.isServicios  ) return true
      
      return this.router.createUrlTree(['/']);

  }

}
