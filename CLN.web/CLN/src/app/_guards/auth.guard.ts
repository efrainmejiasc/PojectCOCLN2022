import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthenticationService } from '../_services/_compras-publicas/authentication.service';


@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

  constructor(private authService:AuthenticationService, private router:Router){}

  canActivate(
    route:ActivatedRouteSnapshot,
    router:RouterStateSnapshot
    ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{

      return this.authService.userBSubject.pipe(
        take(1),
        map(user =>{
        const isAuth = !!user
        if(isAuth){
          return true;
        }
        return this.router.createUrlTree(['/']);
      }))

  }

    /* constructor(
        private authenticationService: AuthenticationService,
        private router:Router,
        private dataService:DataService,
    ) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
      ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        debugger;

        return this.authenticationService.actualUser$.pipe(
          map(user => user === null ? false : true),
            tap(hasUser=>{
              if(!hasUser){
                this.router.navigate(['/home'])
              }
            })
        );
      } */

      /*   pipe(
        map(user => user === null ? false : true),
          tap(hasUser=>{
            if(!hasUser){
              this.router.navigate(['/home'])
            }
          })
      ); */


   /*  canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authenticationService.actualUser$.pipe(
          map(user => user === null ? false : true),
            tap(hasUser=>{
              if(!hasUser){
                this.router.navigate(['/home'])
              }
            })
        );
    } */
}
