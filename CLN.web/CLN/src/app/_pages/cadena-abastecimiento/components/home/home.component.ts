import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeCComponent implements OnInit {

  constructor(private layoutService: LayoutService,private router: Router,) { }

  opciones: any[] = [
    {
      title: 'CÓMO CREAR MI CADENA DE ABASTECIMIENTO',
      defaultImage: 'assets/imgs/iconos/pregunta-azul.svg',
      whiteImage: 'assets/imgs/iconos/pregunta-blanca.svg',
      onClick: (option: string) => this.selectOption(option)
    },
    {
      title: 'IR AL SIMULADOR LOGÍSTICO',
      defaultImage: 'assets/imgs/iconos/simulador-azul.svg',
      whiteImage: 'assets/imgs/iconos/simulador-blanca.svg',
      onClick: (option: string) => this.selectOption(option)
    },
    {
      title: 'CREAR Y EDITAR MI CADENA',
      defaultImage: 'assets/imgs/iconos/suministro-azul.svg',
      whiteImage: 'assets/imgs/iconos/suministro-blanca.svg',
      onClick: (option: string) => this.selectOption(option)
    },
  ];

  selectedOption: string = this.opciones[0].title;

  ngOnInit() {
    this.promise.then(s => {
      this.layoutService.closeLoading();
    }, e => {
      alert('La sesión del usuario no pudo ser encontrada');
      this.router.navigate(["/"]);
      this.layoutService.closeLoading();
    })
  }

  promise = new Promise((resolve, reject) => {
    let usuarioDetectado: any;
    let i = 0
    let interval: any;

    interval = setInterval(() => {
      usuarioDetectado = JSON.parse(localStorage.getItem('userCas'));
      this.layoutService.showLoading();
      if(i < 10){
        if(usuarioDetectado) {
          resolve(usuarioDetectado)
          clearInterval(interval);
        }
      }else{
        reject(usuarioDetectado);
        clearInterval(interval);
      }

      i++;
    }, 1000);
  });

  selectOption(option: string) {
    this.selectedOption = option;
  }

}
