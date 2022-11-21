import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCas } from 'src/app/_model/_compras-publicas/cas.interfaces';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { IcasResponse, ICasUrl } from 'src/app/_model/_compras-publicas/cas.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit, OnDestroy {

  public href: string = "";

  userCasSubscription:Subscription;
  userCas:UserCas;
  dataFromUrl:any;
  iCasUrl:ICasUrl;

  constructor(
    private router: Router,
    private authService:AuthenticationService,
    private layoutService:LayoutService) {

    const thisObj = this;
  }

  ngOnInit() {

    this.userCasSubscription = this.authService.userBSubject.subscribe(data =>{
      this.userCas = data;
    })

    if(this.userCas)
    {
      if(this.userCas.isAdmin){
        this.router.navigate(['panel']);
      }
    }
    else{
      this.authService.generateUrl().subscribe(data =>{

          let response:IcasResponse = data;

          if(response.succeeded){
            this.dataFromUrl = data;
            this.iCasUrl = response.data as ICasUrl;
            this.authService.iCasUrl = this.iCasUrl;
          }

          this.authService.onReceivingDynamicUrl.next(this.authService.iCasUrl.url);
          this.authService.waitForLogin(this.authService.iCasUrl.id, false)
      })
    }
  }

  ngOnDestroy(): void {
    this.userCasSubscription.unsubscribe();
  }
}
