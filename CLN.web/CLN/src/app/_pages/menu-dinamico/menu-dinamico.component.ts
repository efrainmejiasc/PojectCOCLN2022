import { Component, OnDestroy, OnInit } from '@angular/core';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';

@Component({
  selector: 'app-menu-dinamico',
  templateUrl: './menu-dinamico.component.html',
  styleUrls: ['./menu-dinamico.component.scss', '../../_shared/styles/modals.scss']
})
export class MenuDinamicoComponent implements OnInit, OnDestroy {
  displayedMenu;
  userlogged: any;
  MenubyRol: any;
  LoadOrError = {
    message: 'Cargando contenido, por favor espere',
    loadbutton: true,
  };

  ngOnDestroy(): void {
    localStorage.removeItem('position');
  }
  public textDescription: String;
  private descriptionTextList: Array<String> = [
    "Aquí podrá gestionar los contenidos para las distintas bibliotecas, de capacidades, de inducción u otras.",
    "Bienvenida/o, aquí podrá acceder a cada una de las funcionalidades que la plataforma le ofrece de acuerdo con el rol asignado a su usuario.",
    "Aquí podrá gestionar los grupos de roles y roles que se requieren para los usuarios de la plataforma.",
    "Bienvenida/o. Aquí podrá gestionar capacidades y afirmaciones y actualizar sección guía.",
    "Bienvenida/o. Aquí podrá diligenciar y actualizar el autodiagnóstico para su secretaría, también podrá consultar los distintos resultados generados en cada actualización.",
    "Aquí podrá gestionar la información de las secretarías certificadas y los tableros de control asociados a las cifras del sector que se presentarán en la sección Quiero informarme del home."
  ]
  constructor(
    private rolesServices: GestorRolesService,
    private router: Router,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    localStorage.removeItem("session")
    this.fetchMenuByRol();
    this.textDescription = this.descriptionTextList[1];
    this.auth.actualUser$.subscribe((data) => {
      this.userlogged = data;
    });
  }

  fetchMenuByRol() {
    this.rolesServices.getMenubyRol().subscribe(res => {
      this.MenubyRol = res;
      this.displayedMenu = this.MenubyRol;
    }, error => {
      let time = 7;
      this.LoadOrError.loadbutton = false;
      const interval = setInterval(() => {
        this.LoadOrError.message = `Al parecer no tienes los permisos para ingresar, serás redireccionado al menú principal en ${time}S `
        time--;
        if (time < 0) {
          clearInterval(interval);
          this.router.navigate(['/login']);
        }
      }, 1000);
    });
  }

  backTo(e) {
    if (e === true) {
      this.displayedMenu = this.MenubyRol;
      this.textDescription = this.descriptionTextList[1];
      this.activeReturn = false;
    }
  }
  public activeReturn: boolean = false;
  redirect(item) {
    console.log(item);
    switch (item.id) {
      case 1:
        this.textDescription = this.descriptionTextList[0];
        break;
      case 12:
        this.textDescription = this.descriptionTextList[4];
        break;
      case 23:
        this.textDescription = this.descriptionTextList[2];
        break;
      case 30:
        this.textDescription = this.descriptionTextList[3];
        break;
      case 39:
        this.textDescription = this.descriptionTextList[5];
        break;
      default:
        this.textDescription = this.descriptionTextList[1];
        break;
    }
    if (item.hijos) {
      localStorage.setItem('position', 'child');
      this.displayedMenu = item.hijos;
      this.activeReturn = true;
    } else {
      this.activeReturn = false;
      this.displayedMenu = false;
      this.LoadOrError.message = 'redireccionando ...'
      this.LoadOrError.loadbutton = true;
      localStorage.setItem('session', item.id);
      if (item.url === '/autodiagnostico') {
        this.router.navigate([item.url], { queryParams: { redirect: 'yes' } });
      } else if (item.url === '/admin') {
        this.router.navigate([item.url], { queryParams: { redirect: item.id } });
      } else {
        this.router.navigate([item.url]);
      }
    }
  }

  backmenu() {
    this.displayedMenu = this.MenubyRol;
  }

  public closeActionByOutsideClick: any;
  public identifyClickOutSide(event) {
    this.closeActionByOutsideClick = event;
  }
}
