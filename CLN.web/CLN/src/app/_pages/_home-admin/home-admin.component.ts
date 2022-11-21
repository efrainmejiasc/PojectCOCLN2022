import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserCas } from 'src/app/_model/_compras-publicas/cas.interfaces';
import { MenuCP } from 'src/app/_model/_compras-publicas/compraspublicas.interfaces';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { DataService } from 'src/app/_services/_compras-publicas/data.service';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit, OnDestroy {

  userCasSubscription:Subscription;
  userCas:UserCas;
  menusUsuario:MenuCP[] = [];
  isServicios: boolean = false

  arrayMenus: any[] = [];

  constructor(
    private authService:AuthenticationService,
    private dataService: DataService,
    private layoutService:LayoutService,
    private router:Router ) {}


  ngOnInit() {

    this.isServicios = environment.isServicios;

    this.layoutService.showLoading();

    this.menusUsuario = [];

    this.userCasSubscription = this.authService.userBSubject.subscribe(data =>{
      this.userCas = data;

      if(this.userCas){
        this.dataService.getUserMenus(this.userCas).subscribe(data =>{
          this.menusUsuario = data;
          
          this.nuevoMenu(this.menusUsuario);
          this.layoutService.closeLoading();
        });

        if(localStorage.getItem('perfilempresaactualizado') !== 'Si')
        {
          this.dataService.updateUserCompanyProfile(this.userCas)
          .subscribe(data => {
            localStorage.setItem('perfilempresaactualizado', 'Si')
            console.log('Actualizando el perfil de las empresas del usuario logueado', data)
          },
          err => {
            localStorage.setItem('perfilempresaactualizado', 'No')
            console.log("Error.", err);
          });
        }
      }
      else{
        this.layoutService.closeLoading();
      }
    }, error => {
      this.layoutService.closeLoading();
    });
  };

  ngOnDestroy(): void {
    this.userCasSubscription.unsubscribe();
  }

  goToSection(link:string){
    this.router.navigate([link]);
  }

  nuevoMenu(menu: MenuCP[]) {
    let menu4: MenuCP[]=[];

    menu.forEach((item, index) => {
      menu4.push(item);
      
      if (Number.isInteger((index+1) / 4 )) {
        this.arrayMenus.push(menu4);
        menu4 = [];
      }
    });
    if (menu4.length) {
      this.arrayMenus.push(menu4);
    }
  }
}
