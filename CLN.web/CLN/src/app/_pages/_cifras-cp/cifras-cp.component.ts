import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { ConsolidadosService } from 'src/app/_services/_consolidados/consolidados.service';
import { ConsolidadoComponent } from './components/consolidado/consolidado.component';

type SelectedOption = {
  id: number,
  name: string,
  url: string
}

@Component({
  selector: 'app-cifras-cp',
  templateUrl: './cifras-cp.component.html',
  styleUrls: ['./cifras-cp.component.scss']
})
export class CifrasCpComponent implements OnInit {

  seeHelp = false;

  titulo = "VER CONSOLIDADOS";
  icono = "assets/img/others/consolidado.svg";
  alertaIcono = "assets/imgs/home-editor/alerta.svg";
  buttonText = "COMPRAS PÚBLICAS";
  infoAyuda = "Bienvenido(a), acá podrás consultar información consolidada de los Procesos de Contratación Pública en curso."

  menu = []

  selectedOption: SelectedOption = {
    id: 0,
    name: "",
    url: ""
  };

  constructor(public dialog: MatDialog,private consolidadosService: ConsolidadosService,private layoutService:LayoutService) { }

  ngOnInit() {
    this.layoutService.showLoading();
    this.consolidadosService.getConsolidados().subscribe((data: any) => {
      this.menu = data;
      this.layoutService.closeLoading();
    }, error => {
      this.layoutService.closeLoading();
    });

    window.scrollTo({
      top: 0
    })

  }

  openDialog(): void {
    
    const data = this.selectedOption.id === 2 || this.selectedOption.id === 4 ? true : false;
    let opcion = '';

    if( this.selectedOption.id === 1 || this.selectedOption.id === 3 ){
      opcion = 'VER CONSOLIDADO POR PRODUCTOS Y SERVICIOS DE NACIONES UNIDAS UNSPSC';
    }else{
      opcion = 'VER CONSOLIDADO DE LOS SECTORES PRODUCTIVOS'
    }
    
    this.dialog.open(ConsolidadoComponent, {
      maxWidth: '90%',
      width: '99%',
      height: '99%',
      data: {
        opcion: opcion,
        esColombiaProductiva: data,
        idOpcion: this.selectedOption.id
      },
    });
  }

  selectOption( option: any) {
    this.layoutService.showLoading();
    
    setTimeout(() => {
      this.selectedOption = option;
      this.layoutService.closeLoading();
    }, 500);
    
  }

}

