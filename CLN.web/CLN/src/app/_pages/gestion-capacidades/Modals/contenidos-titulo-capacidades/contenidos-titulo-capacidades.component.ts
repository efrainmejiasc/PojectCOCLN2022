import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { AutodiagnosticoService } from 'src/app/_services/gestion-capacidades/autodiagnostico.service';
import { CrearCapacidadComponent } from '../crear-capacidad/crear-capacidad.component';
import { environment } from 'src/environments/environment';
import { VideoComponent } from '../video/video.component';
import { files } from 'src/app/_model/capacidad/files.model';

@Component({
  selector: 'app-contenidos-titulo-capacidades',
  templateUrl: './contenidos-titulo-capacidades.component.html',
  styleUrls: ['./contenidos-titulo-capacidades.component.scss',
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",]
})
export class ContenidosTituloCapacidadesComponent implements OnInit, AfterViewInit {

  @Input() titulo: string[];
  @Output() evento = new EventEmitter<string>();
  @Output() show = new EventEmitter<boolean>();
  @Input() permitsUser: permitsUserFetch;
  @Input() capacidadesClose: boolean;
  @Input() filesData: files;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private autoService: AutodiagnosticoService
  ) { }

  public heightText: any;
  ngOnInit() {
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      var a = document.getElementById("contentText").offsetHeight;
      this.heightText = a + "px";
    }, 1000);
  }
  openDialog(titulo: string) {
    const dialogRef = this.modalService.open(
      titulo === 'Crear capacidad y afirmación' ? CrearCapacidadComponent : "",
      { size: 'xl', centered: true, backdrop: 'static', });
    dialogRef.componentInstance.sendedData = titulo;
    dialogRef.result.then((yes) => {
      switch (titulo) {
        case 'Crear grupos de roles':
          this.evento.next(yes);
          break;
        default:
          this.evento.next();
          break;
      }
    },
      (cancel) => { });
  }

  public actionRouterButton(routerType) {
    switch (routerType) {
      case "grupos":
        this.router.navigate(["gestionroles/" + routerType])
        break;
    }
  }
  @Output() openCap = new EventEmitter<boolean>(true);
  public returnData: boolean;
  showCapacidad() {
    (this.returnData) ? this.returnData = false : this.returnData = true;
    this.show.emit(this.returnData)
  }

  getGuia() {
    this.autoService.getDocuments(this.filesData.archivoGuia)
      .subscribe(data => {
        let name = this.filesData.archivoGuia.split("/");
        const fileName = name[name.length - 1];
        const objectUrl: string = URL.createObjectURL(data);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        a.href = objectUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      })
  }

  public openVideo() {
    const ref = this.modalService.open(VideoComponent,
      { size: 'lg', centered: true, backdrop: 'static', })
    ref.componentInstance.videoUrl = this.filesData.videoGuia;
  }

}
