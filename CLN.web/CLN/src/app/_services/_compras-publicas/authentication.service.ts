import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserCas } from 'src/app/_model/_compras-publicas/cas.interfaces';
import { Router } from '@angular/router';
import { IcasResponse, ICasUrl } from '../../_model/_compras-publicas/cas.interfaces';
import { EmailCN } from '../../_model/_compras-publicas/compraspublicas.interfaces';
import { LayoutService } from './layoutService.service';


@Injectable({ providedIn: 'root' })

export class AuthenticationService{

  public generateUrlString:string = environment.apiUrl + '/api/CAS/generateUrl';
  public waitForLoginUrl:string = environment.apiUrl + '/api/CAS/waitForLogin/';
  public recuperarPasswordUrl:string = environment.apiUrl + '/api/CAS/forgotPasword'

  public userBSubject: BehaviorSubject<UserCas>;
  //public userCas$:Observable<UserCas>;
  private userCas:UserCas;
  public onLoginLogoutSubject = new Subject<boolean>();

  //public dataFromUrl:any;
  public iCasUrl:ICasUrl;
  public onReceivingDynamicUrl = new Subject<string>();

  //Este actualUser$ está en muchos lados de la app que ahora no se usan. Una observable que se debería quitar en elgún momento
  public actualUser$: Observable<UserCas>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private layoutService:LayoutService) {

    this.userBSubject = new BehaviorSubject<UserCas>(JSON.parse(localStorage.getItem('userCas')));
  }

  get userInfo():UserCas{
    return this.userBSubject.getValue();
  }

  get userInfoObservable(){
    return this.userBSubject.asObservable();
  }

  generateUrl(): Observable<IcasResponse> {
    let dir = this.generateUrlString;
    return this.http.get<IcasResponse>(dir).
    pipe(map(dataReceived =>{
        return dataReceived;
      }),
      catchError(errorRes =>{
          alert("Ha ocurrido un error en el sistema, por favor refresca la página");
          return throwError(errorRes);
      })
    );
  };

  async waitForLogin(id:string, loginLocal: boolean){

    const postUrl = `${this.waitForLoginUrl}${id}`;

    return this.http.post<IcasResponse>(postUrl, "").
      pipe(map(dataReceived =>{
        return dataReceived;
      }),
      catchError(errorRes =>{
          alert("Ha ocurrido un error en el sistema, por favor refresca la página");
          return throwError(errorRes);
      })
    )
    .subscribe(data =>{
      let response:IcasResponse = data;
      this.userCas = response.data;

      if(this.userCas.isAdmin && this.router.url !== "/login-admin"){

        alert("Recuerda que si eres administrador debes autenticarte en el enlace suministrado");

        this.onLoginLogoutSubject.next(false);
        this.userBSubject.next(null);
        this.router.navigate(["/"]);

        return;
      }

      localStorage.setItem('userCas', JSON.stringify(this.userCas));
      this.userBSubject.next(JSON.parse(localStorage.getItem('userCas')));
      this.onLoginLogoutSubject.next(true);

      if(loginLocal) this.router.navigate(["panel"]);
      
    });
  };

  logout() {
    localStorage.removeItem('userCas');
    localStorage.removeItem('perfilempresaactualizado');
    this.userBSubject.next(null);
    this.onLoginLogoutSubject.next(false);
    this.router.navigate([""]);
  }

  logoutCLN(url: string) {
    return this.http.get(`${environment.apiUrl}/api/Common/closeSession?urlCLN=${url}`);
  };

  recoverPasswordByEmail(email: string) {
    const emailPrueba = email;

    const emailCN:EmailCN = {
      email:`${emailPrueba}`
    }

    return this.http.post<EmailCN>(this.recuperarPasswordUrl, emailCN);
  }

  logoutWhitoutSession() {

  }

  public getUTCServerDate(): any {
    //return this.http.get<Date>(`${environment.apiUrl}/api/componenteHome/getUTCServerDate/`)
  }

 /*  public get actualUrlDynamicId(): string {
    return this.actualUrlDynamicIdSubject.value;
  } */

  /* public get currentUserValue(): UserCN {
      return this.actualUserSubject.getValue();
  } */

  /* private logoutSessionBack() {
      return this.http.post<any>(`${environment.apiUrl}/api/usuario/logout`, {});
  } */

  /* private logoutSessionWhitoutToken(idusuario : String) {
      return this.http.post<any>(`${environment.apiUrl}/api/usuario/logoutWithoutSession?idUser=${idusuario}`, {});
  } */

  /* private refreshToken() {
      return this.http.post<any>(`${environment.apiUrl}/api/usuario/refreshUserSession`, {}, { observe: 'response' });
  } */

  /* recoverPasswordByEmail(user: user) {
      var baseurlOrigin: string = window.location.origin;
      const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.post<any>(`${environment.apiUrl}/api/usuario/recoverUserPassword`, user, httpOptions)
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user) {
              }
              return user;
          }));
  } */

  /* public setCurrentUserValue(updatedUser: UserCN) {
      localStorage.setItem('actualUser', JSON.stringify(updatedUser));
      this.actualUserSubject.next(updatedUser);
  } */


  //timeOutIDs: any[] = [];

 /*  public reloadSession() {
      let user = JSON.parse(localStorage.getItem("actualUser"));
      if (this.actualUser$ != null && user != null && user.token != null) {
          this.getUTCServerDate()
              .subscribe(data => {
                  this.timeOutIDs.forEach(id => clearTimeout(id));
                  const base64Url = user.token.split('.')[1];
                  const base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
                      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                  }).join(''));
                  const tokenBC = JSON.parse(base64);
                  var dateExp: number = tokenBC.exp - 120;
                  var dateTo: string = new Date(data).getTime().toString().slice(0, -3);
                  var diference = (dateExp - parseInt(dateTo)) / 60 * 60000;
                  console.log(diference);
                  (diference < 0) ? diference = 0 : "";
                  this.timeOutIDs.push(
                      setTimeout(() => {
                          this.refreshToken()
                              .subscribe((data: HttpResponse<any>) => {
                                  const myHeader = data.headers.get('X-Token');
                                  user.token = myHeader;
                                  localStorage.setItem("actualUser", JSON.stringify(user));
                                  this.reloadSession();
                              }, error => {
                                  this.logout();
                              })
                      }, diference)
                  );
              })
      }
  } */


/*   login(correoElectronico: string, clave: string) {
      return this.http.post<any>(`${environment.apiUrl}/api/usuario/authenticate`, { correoElectronico, clave })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  if (!user.esBorrado) { // should be active
                      // store user details and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('actualUser', JSON.stringify(user));
                      this.actualUser = user;
                      this.actualUserSubject.next(user);
                  }
              }
              return user;
          }));
  } */

  /* login2(idusuario: any, Password: any) {
      return this.http.post<any>(`${environment.apiUrl}/api/usuario/authenticate2`, { idusuario, Password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  if (user.activo) { // should be active
                      // store user details and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('actualUser', JSON.stringify(user));
                      this.actualUser = user;
                      this.actualUserSubject.next(user);
                  }
              }
              return user;
          }));
  } */
}


/*

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_model/user';
import { user } from '../_model/user-data/user.module';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private actualUserSubject: BehaviorSubject<User>;
    public actualUser: User;
    public actualUser$: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.actualUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('actualUser')));
        this.actualUser$ = this.actualUserSubject.asObservable();
    }

    public get actualUserValue(): User {
        return this.actualUserSubject.value;
    }

    public get currentUserValue(): User {
        return this.actualUserSubject.getValue();
    }

    logout() {
        // remove user from local storage to log user out
        this.logoutSessionBack().subscribe(data => { console.log(data) })
        localStorage.removeItem('actualUser');
        localStorage.removeItem('loginUser');
        this.actualUserSubject.next(null);
        this.router.navigate(["/login"])
    }

    logoutWhitoutSession() {
        // remove user from local storage to log user out
        let user = JSON.parse(localStorage.getItem("actualUser"));
        let idusuario : string = user.idUsuario;

        localStorage.removeItem('actualUser');
        localStorage.removeItem('loginUser');
        localStorage.removeItem('lastMove');

        this.logoutSessionWhitoutToken(idusuario).subscribe(data => { console.log(data) })
        this.actualUserSubject.next(null);
        this.timeOutIDs.forEach(id => clearTimeout(id));
        this.router.navigate(["/login"])
    }

    private logoutSessionBack() {
        return this.http.post<any>(`${environment.apiUrl}/api/usuario/logout`, {});
    }

    private logoutSessionWhitoutToken(idusuario : String) {
        return this.http.post<any>(`${environment.apiUrl}/api/usuario/logoutWithoutSession?idUser=${idusuario}`, {});
    }

    private refreshToken() {
        return this.http.post<any>(`${environment.apiUrl}/api/usuario/refreshUserSession`, {}, { observe: 'response' });
    }

    public getUTCServerDate(): any {
        return this.http.get<Date>(`${environment.apiUrl}/api/componenteHome/getUTCServerDate/`)
    }

    recoverPasswordByEmail(user: user) {
        var baseurlOrigin: string = window.location.origin;
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.post<any>(`${environment.apiUrl}/api/usuario/recoverUserPassword`, user, httpOptions)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                }
                return user;
            }));
    }

    public setCurrentUserValue(updatedUser: User) {
        localStorage.setItem('actualUser', JSON.stringify(updatedUser));
        this.actualUserSubject.next(updatedUser);
    }


    timeOutIDs: any[] = [];
    public reloadSession() {
        let user = JSON.parse(localStorage.getItem("actualUser"));
        if (this.actualUser$ != null && user != null && user.token != null) {
            this.getUTCServerDate()
                .subscribe(data => {
                    this.timeOutIDs.forEach(id => clearTimeout(id));
                    const base64Url = user.token.split('.')[1];
                    const base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    const tokenBC = JSON.parse(base64);
                    var dateExp: number = tokenBC.exp - 120;
                    var dateTo: string = new Date(data).getTime().toString().slice(0, -3);
                    var diference = (dateExp - parseInt(dateTo)) / 60 * 60000;
                    console.log(diference);
                    (diference < 0) ? diference = 0 : "";
                    this.timeOutIDs.push(
                        setTimeout(() => {
                            this.refreshToken()
                                .subscribe((data: HttpResponse<any>) => {
                                    const myHeader = data.headers.get('X-Token');
                                    user.token = myHeader;
                                    localStorage.setItem("actualUser", JSON.stringify(user));
                                    this.reloadSession();
                                }, error => {
                                    this.logout();
                                })
                        }, diference)
                    );
                })
        }
    }

    login(correoElectronico: string, clave: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/usuario/authenticate`, { correoElectronico, clave })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    if (!user.esBorrado) { // should be active
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('actualUser', JSON.stringify(user));
                        this.actualUser = user;
                        this.actualUserSubject.next(user);
                    }
                }
                return user;
            }));
    }

    login2(idusuario: any, Password: any) {
        return this.http.post<any>(`${environment.apiUrl}/api/usuario/authenticate2`, { idusuario, Password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    if (user.activo) { // should be active
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('actualUser', JSON.stringify(user));
                        this.actualUser = user;
                        this.actualUserSubject.next(user);
                    }
                }
                return user;
            }));
    }

    changePass(user: user) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.put<any[]>(`${environment.apiUrl}/api/usuario/updateUserPassword`, user, httpOptions);
    }

    closeAccount(idusuario: number) {
        return this.http.post<any>(`${environment.apiUrl}/api/usuario/cancelAccount`, { idusuario })
            .pipe(map(user => {
                return user;
            }));
    }

    getMenu() {
        const retorno = this.http.get<any[]>(`${environment.apiUrl}/api/usuario/menus`);
        return retorno;
    }
}


*/
