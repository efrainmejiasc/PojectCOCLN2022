import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertasService } from 'src/app/_services/_alertas/alertas.service';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { buildDate } from 'src/utils/buildDate';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  linkTo = "/panel";

  alertas: Observable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  data = []
  showAlerta = false;
  showConfirmAlerta = false;
  notificationMessage = '';
  notificationConfirmMessage = '';
  alertaSeleccionada: any;
  opcion = '';

  constructor(
    private alertasService: AlertasService, 
    private changeDetectorRef:ChangeDetectorRef, 
    private layoutService:LayoutService,
    private router: Router) {

  }

  ngOnInit() {
    this.consultarAlertas();
    
    window.scrollTo({
      top: 0
    })
  }

  totalAlertas = 0;

  consultarAlertas(){
    this.layoutService.showLoading();
    this.alertasService.getAlerta().subscribe(({ data }: any) => {

      this.totalAlertas = data.length;

      this.dataSource = new MatTableDataSource<any>(data);

      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;

      this.dataSource.paginator._intl.firstPageLabel = 'Ir al inicio';
      this.dataSource.paginator._intl.previousPageLabel = 'Página anterior';
      this.dataSource.paginator._intl.nextPageLabel = 'Página siguiente';
      this.dataSource.paginator._intl.lastPageLabel = 'Ir al final';
  
      this.dataSource.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
  
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;
  
        return `${startIndex + 1} - ${endIndex} de ${length} elementos | Página ${Math.ceil(endIndex / 3)} de ${Math.ceil(length / 3)}`;
      }

      this.alertas = this.dataSource.connect();

      this.layoutService.closeLoading();
      
    }, error => {
      this.layoutService.closeLoading();
    });
  }

  construirFecha(date: string){

    if(date === '1900-01-01') return '';

    return buildDate(new Date(date));
  }

  actualizarAlerta( alerta: any ) {
    this.router.navigate([`alerts-form/${alerta.idAlert}`]);
  }

  nuevaAlerta() {
    this.router.navigate([`alerts-form`]);
  }

  eliminar( alerta: any ) {
    this.alertaSeleccionada = alerta;
    this.notificationMessage = '¿Deseas eliminar definitivamente la alerta seleccionada?';
    this.showAlerta = true;
    this.opcion = 'eliminar';
  }

  cambiarEstado( alerta: any ) {

    this.alertaSeleccionada = alerta;

    if( !alerta.isActive ){
      this.notificationMessage = '¿Deseas activar la alerta seleccionada?';
      this.opcion = 'activar';
    }else{
      this.notificationMessage = '¿Deseas inactivar la alerta seleccionada?';
      this.opcion = 'inactivar';
    }

    this.showAlerta = true;
    
    
  }

  gestion( value: boolean ){

    if( this.opcion === 'eliminar'){

      if( value ){
        this.alertasService.eliminarAlerta( this.alertaSeleccionada.idAlert ).subscribe(( data: any ) => {
          this.notificationConfirmMessage = 'Se ha eliminado exitosamente la alerta';
          this.showConfirmAlerta = true;
          this.consultarAlertas();
        }, error => {
          console.error(error)
        });
      }

    }else if( this.opcion === 'editar' ){

      if( value ){
        console.log(this.alertaSeleccionada);
      }

    }else if( this.opcion === 'activar'){

      if( value ){
        this.alertasService.cambiarEstadoAlerta( this.alertaSeleccionada.idAlert, true ).subscribe(( data: any ) => {
          this.notificationConfirmMessage = 'Se ha reactivado exitosamente la  programación de la alerta';
          this.showConfirmAlerta = true;
          this.consultarAlertas();
        }, error => {
          console.error(error)
        });
      }

    }else if( this.opcion === 'inactivar'){

      if( value ){
        this.alertasService.cambiarEstadoAlerta( this.alertaSeleccionada.idAlert, false ).subscribe(( data: any ) => {
          this.notificationConfirmMessage = 'Se ha inactivado exitosamente la alerta';
          this.showConfirmAlerta = true;
          this.consultarAlertas();
        }, error => {
          console.error(error)
        });
      }

    }

    this.showAlerta = false;

  }

  closePopup( value: any ){
    this.showConfirmAlerta = false;
  }

}
