import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envio-alertas',
  templateUrl: './envio-alertas.component.html',
  styleUrls: ['./envio-alertas.component.scss']
})
export class EnvioAlertasComponent implements OnInit {

  linkTo = "/panel-admin";
  titulo = "PROGRAMACIÓN ENVÍO DE ALERTAS";
  icono = "assets/imgs/iconos/iconoalertas.svg";
  alertaIcono = "assets/imgs/home-editor/alerta.svg";
  infoAyuda = "Bienvenido(a), acá podrás programar, editar, activar o inactivar alertas para los distintos tipos de notificación";

  alerta: any;

  listadoEstaVisible = true;

  constructor(private router: Router) { }

  ngOnInit() {
    window.scrollTo({
      top: 0
    })
  }

  mostrarFormulario( alerta: any ){
    this.alerta = alerta;
    this.router.navigate([`alerts-form`]);
    // this.listadoEstaVisible = !this.listadoEstaVisible;
  }

}
