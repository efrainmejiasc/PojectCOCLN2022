import { Component, OnInit } from '@angular/core';
import { IcasResponse, ICasUrl } from 'src/app/_model/_compras-publicas/cas.interfaces';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private authService:AuthenticationService,
    private layoutService:LayoutService) { }

  ngOnInit() {

    this.generateUrlForLogin();

  }
  public closeActionByOutsideClickMenu: any;
  public identifyClickOutSideMenu(event) {
    this.closeActionByOutsideClickMenu = event;
  }

  dataFromUrl: any;
  iCasUrl: any;

  generateUrlForLogin(loginLocal = false){

    localStorage.setItem('isLocalSession', `${loginLocal}`);

    const storage = JSON.parse(localStorage.getItem('userCas'));

    if( storage ) return
    
    this.layoutService.showLoading();

    this.authService.generateUrl().subscribe(data =>{

        let response:IcasResponse = data;

        if(response.succeeded){
          this.dataFromUrl = data;
          this.iCasUrl = response.data as ICasUrl;
          this.authService.iCasUrl = this.iCasUrl;
        }
        
        this.authService.onReceivingDynamicUrl.next(this.authService.iCasUrl.url);
        this.authService.waitForLogin(this.authService.iCasUrl.id, loginLocal)

        this.layoutService.closeLoading();
    })
  }
}
