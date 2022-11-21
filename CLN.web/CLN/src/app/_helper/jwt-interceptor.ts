import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError, filter, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Services
import { NotificationService } from '../_services/notification.service';
import { AuthenticationService } from '../_services/_compras-publicas/authentication.service';

// Components
import { AlertModalComponent } from '../_shared/modals/alert-modal/alert-modal.component';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private notifier: NotificationService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  private isTokenRefreshing = false;
  private isUnauthorized:boolean =false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.attachTokenToRequest(request)).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log("Success");
        }
      }),
      catchError((err): Observable<any> => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          switch ((err as HttpErrorResponse).status) {
            case 401:
              /*console.log("entro a 401");
              console.log("isunauthorized: "+ this.isUnauthorized);*/
              if(!this.isUnauthorized)
              {
                this.isUnauthorized = true;
                setTimeout(() => {
                  this.alertModal('La sesión ha caducado, por favor vuelva a iniciar sesión.');
                  this.authenticationService.logout();
                }, 1000);
              }
              break;
            case 400:
              return this.handleError(err);
          }
        } else {
          return throwError(err);
        }
        return throwError(err);
      }));
  }

    // Method to handle http error response
    private handleHttpResponseError(request: HttpRequest<any>, next: HttpHandler) {
      // First thing to check if the token is in process of refreshing
      if (!this.isTokenRefreshing) { // If the Token Refresheing is not true
        this.isTokenRefreshing = true;
        // Any existing value is set to null
        // Reset here so that the following requests wait until the token comes back from the refresh token API call
        this.tokenSubject.next(null);
        /// call the API to refresh the token
        return this.authenticationService.logout();
      } else {
        this.isTokenRefreshing = false;
        if (this.authenticationService.userInfo) {
          return this.tokenSubject.pipe(filter(token => token != null),
            take(1),
            switchMap(token => {
              return next.handle(this.attachTokenToRequest(request));
            }));
        } else {
          return this.handleError(new HttpErrorResponse({ error: 'Authentication Fail', status: 401 }));
        }
      }
    }

    // Global error handler method
    public handleError(errorResponse: HttpErrorResponse) {
      let errorMsg: string;

      if (errorResponse.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMsg = "An error occured : " + errorResponse.error.message;
      } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          if ([401, 403].indexOf(errorResponse.status) !== -1) {
              //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
              this.authenticationService.logout();
              //location.reload(true);
          } else {
              // console.log(err);
              errorMsg = `Backend returned code ${errorResponse.status}, body was: ${errorResponse.error}`;
              this.notifier.notify(errorMsg, 2);
          }
      }
      return throwError(errorMsg);
  }

  private attachTokenToRequest(request: HttpRequest<any>) {
    // add authorization header with jwt token if available
    
    const currentUser = JSON.parse(localStorage.getItem("userCas"));

    if( request.url.includes(environment.apiUrl) ){

      if (currentUser && currentUser.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
            ApiKey: environment.API_KEY
          }
        });
      }else {
        request = request.clone({
          setHeaders: {
            ApiKey: environment.API_KEY
          }
        });
      }

    }

    /* console.log("request")
    console.log(request); */
    return request;
  }

  alertModal(message: string) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = message;
    ref.result.then((response) => {
    },
      (cancel) => {
        //console.log("entro a cancelar token por Unauthorized")
        this.isUnauthorized = false;
        this.authenticationService.logoutWhitoutSession();
      });
  }
}
