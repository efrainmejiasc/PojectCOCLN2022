import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { GestionarDisponibilidadService } from 'src/app/_services/_gestionar-disponibilidad/gestionar-disponibilidad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citas-programadas',
  templateUrl: './citas-programadas.component.html',
  styleUrls: ['./citas-programadas.component.scss']
})
export class CitasProgramadasComponent implements OnInit {


  @Input() empresaSeleccionada: number = 0;
  opciones: any[] = [
    {
      title: 'Anfitrión',
      onClick: (option: string) => this.selectOption(option),
      disabled: false
    },
    {
      title: 'Invitado',
      onClick: (option: string) => this.selectOption(option),
      disabled: false
    },
  ];
  selectedOption: string = this.opciones[0].title;

  infoEmpresa: any = {
    companyIdentifier: null
  };

  url: any;

  constructor(
    private gestionarDisponibilidadService: GestionarDisponibilidadService,
    private layoutService: LayoutService,
    private router: Router) { 
      this.url = this.router.parseUrl(this.router.url);
    }

  ngOnInit() {

    this.infoEmpresa = this.empresaSeleccionada[0];

    if(this.empresaSeleccionada && !this.empresaSeleccionada[0].isOwner) this.opciones[1].disabled = true;

    if( !this.infoEmpresa.companyIdentifier ) return;
        
    if (this.url.queryParams['tab'] === "guest-scheduled-appointments") {
      this.selectedOption=this.opciones[1].title;
    }

    return;
    // this.infoEmpresa.numberId = 0;
    this.layoutService.showLoading();
    this.empresaSeleccionada && this.gestionarDisponibilidadService.getInfoEmpresa(this.empresaSeleccionada).subscribe(
      ({ data }) => {

        this.infoEmpresa = data;
        
        if (this.url.queryParams['tab'] === "guest-scheduled-appointments") {
          this.selectedOption=this.opciones[1].title;
        }

        this.layoutService.closeLoading();

      }, error => {
        this.layoutService.closeLoading();
    });
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }

}
