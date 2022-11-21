import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserCas } from 'src/app/_model/_compras-publicas/cas.interfaces';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';

@Component({
  selector: 'app-gestion-mis-intereses',
  templateUrl: './gestion-mis-intereses.component.html',
  styleUrls: ['./gestion-mis-intereses.component.scss']
})
export class GestionMisInteresesComponent implements OnInit {

  @Output() linkTo = "/panel";
  @Output() titulo = "DEFINE TUS INTERESES EN COMPRAS PÚBLICAS";
  @Output() icono = "assets/imgs/iconos/gestionarintereses.svg";
  @Output() alertaIcono = "assets/imgs/home-editor/alerta.svg";
  @Output() infoAyuda = "Selecciona tu empresa, da clic en ‘Procesos de Compras Públicas’ y completa la información del formulario de acuerdo con los intereses de tu empresa. Recuerda que puedes ajustarlo las veces que consideres necesarias y la actualización de los resultados se efectuará dentro de las 24 horas siguientes. Proximamente podrás activar el sistema de notificaciones para recibir información sobre los Procesos de Contratación Pública vigentes. ";

  currentItem = 'Television';
  showHelp:boolean = false;

  userCasSubscription:Subscription;
  userCas:UserCas;

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    this.userCasSubscription = this.authService.userBSubject.subscribe(data =>{
      this.userCas = data;
    });
  };

  toogleHelp(){
    this.showHelp = !this.showHelp;
  };
};
