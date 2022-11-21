import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { ValidatorService } from 'src/app/_services/validator.service';
import { ViewportScroller } from '@angular/common';
//import { AutodiagnosticoService } from 'src/app/_services/autodiagnostico.service';
import { AutodiagnosticoService } from 'src/app/_services/gestion-capacidades/autodiagnostico.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {

  @ViewChild('content', { static: false }) modal;
  max_length: number = 800;
  asistencia: any = {};
  private newlistCapacidades: any[] = [];
  showNewlistCapacidades: any[] = [];
  newlist: any[] = [];
  listCapacidades: any[] = [];
  categoriaCap: any;
  listCapacidadesFort: any[] = [];
  userlogged: any;
  bannersup: any;

  idCategoria: any = '';
  idAfirmacion: any = 'seleccione';
  idAfirmacion2: any[] = [];
  Capacidades: any[] = [];
  solicitud = '';
  secretarias: any[];
  idSecretaria: any = 'seleccione';
  email: any;
  correo: any[] = [];
  characters: any;
  version: any;
  dropdownSettings = {};
  is_loading = false;
  autodiagnosticoTerminado = false;
  enviarAsistenciaEnabled = false

  constructor(public service_Auto: AutodiagnosticoService,
    public viewportScroller: ViewportScroller,
    public validator: ValidatorService, private auth: AuthenticationService, private adminService: AdminService, private router: Router, configModal: NgbModalConfig, private modalService: NgbModal) {
    viewportScroller.scrollToPosition([0, 0]);

  }

  ngOnInit() {
    this.haveAcces();
  }

  public heightText: any;
  ngAfterViewInit() {
    setTimeout(() => {
      var a = document.getElementById("contentText").offsetHeight;
      this.heightText = a + "px";
    }, 1000);
  }
  private haveAcces() {
    this.service_Auto.haveAcces()
    .subscribe(data => {
      if(!data) {
        this.router.navigate(['/menudinamico']);
      } else {
        this.get_CapacidadesbyCat();
        this.getSecretarias();
        this.Capacidades.push({ idAfirmacion: 0, afirmacionResumen: '' });
        this.auth.actualUser$.subscribe(data => {
          this.userlogged = data;
        });

        this.checkAutodiagnosticoTerminado(this.userlogged.idUsuario);
        console.log('TT', this.autodiagnosticoTerminado)

        if (this.userlogged == null) {
          this.router.navigate(['/login']);
        }

        this.do_getVersion();

        this.dropdownSettings = {
          singleSelection: false,
          idField: 'idValor',
          textField: 'nombre',
          selectAllText: 'Seleccionar todo',
          unSelectAllText: 'Deseleccionar todo',
          searchPlaceholderText: 'Buscar',
          itemsShowLimit: 1,
          allowSearchFilter: true
        };
      }
    }, error=> {
      this.router.navigate(['/login']);
    })
  }

  checkEnvioAsistencia() {
    console.log('SOL', this.solicitud)
    if (this.idCategoria != '' && this.solicitud != '' && this.idAfirmacion2.length > 0) {
      this.enviarAsistenciaEnabled = true
    } else {
      this.enviarAsistenciaEnabled = false
    }
  }

  checkAutodiagnosticoTerminado(idUsuario) {
    this.service_Auto.terminado(idUsuario)
      .subscribe(result => {
        console.log(result)
        this.autodiagnosticoTerminado = result['terminado'];
        console.log(result)
      },
        error => { console.log(error) });
  }

  openModal() {
    this.modalService.open(this.modal, { size: 'lg', centered: true });
  }

  onItemSelect(event: any) {
    /*console.log("event select");
    console.log(event);*/
    console.log(this.idAfirmacion2);
  }

  do_getVersion() {
    this.service_Auto.getVersion(this.userlogged.idUsuario).subscribe(result => {
      console.log("version", result);
      this.version = result['numeroAutoDiagnostico'];
      console.log(this.version);
      if (this.version < 0) {
        this.router.navigate(['/autodiagnostico']);
      }
    }, error => {
      console.log(error);
    });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.idCategoria = 'seleccione';
    this.idAfirmacion = 'seleccione';
    this.idAfirmacion2 = [];
    this.solicitud = "";
    this.idSecretaria = 'seleccione';
    this.idCategoria = '';
    this.email = '';
  }

  do_checkCharacters() {
    this.max_length = 800 - this.asistencia.solicitud.length;
  }
  do_Main() {
    this.router.navigate(['/autodiagnostico']);
  }

  onItemDeSelect(item: any) {
    //
  }

  get_CapacidadesbyCat() {
    this.adminService.getListCapacidades().subscribe(result => {
      let personal: any[] = [];
      this.newlistCapacidades = result;
      this.showNewlistCapacidades = this.newlistCapacidades.filter(capacidades => capacidades.idValorPadre == 2071);
      console.log("----------")
      console.log(this.showNewlistCapacidades)
      console.log("----------")
      var i: number = 0;
      /* result.forEach(data => {

        if (result[i].nombre.toLowerCase().includes("estratégica") || result[i].nombre.includes("ESTRATEGICA")) {
          result[i].nombre = "CAPACIDADES ESTRATÉGICAS";
          this.newlistCapacidades.push(result[i]);
        }
        if (result[i].nombre.includes("técnica")) {
          result[i].nombre = "CAPACIDADES TÉCNICA";
        }
        if (result[i].nombre.includes("personal")) {
          result[i].nombre = "CAPACIDADES PERSONALES";
          //this.newlistCapacidades.push(result[i]);
          personal.push(result[i]);
        }
        this.listCapacidades.push(result[i]);
        i++;*/
    })
    console.log(this.newlistCapacidades)
    /*this.newlist = [];
    for (let j = 0; j < this.listCapacidades.length; j++) {

      if (this.listCapacidades[j].categoria == "CAPACIDADES TÉCNICAS") {
        for (let a = 0; a < this.listCapacidades[j].afirmaciones.length; a++) {
          this.newlist.push(this.listCapacidades[j].afirmaciones[a]);
        }
      }

    }
    this.newlistCapacidades.push({ "categoria": "CAPACIDADES TÉCNICAS", "afirmaciones": this.newlist });
    this.newlistCapacidades.push(personal[0]);*/
    console.log(this.newlistCapacidades);
  //})
}

getListContenidoFort() {
  this.adminService.getListContenidoFort(this.categoriaCap).subscribe(res => {
    console.log(res);
    this.listCapacidadesFort = res;
  }), error => {
    console.log(error);
  }
}

onSelectCategoria() {
  this.checkEnvioAsistencia()

  console.log(this.idCategoria);
  console.log("||||||||||||")
  console.log(this.newlistCapacidades);
  console.log("||||||||||||")
  this.Capacidades = this.newlistCapacidades.filter(capacidades => capacidades.idValorPadre == this.idCategoria);
  console.log(this.Capacidades);
}

getSecretarias() {
  this.adminService.getSecretarias().subscribe(result => {
    console.log(result);
    this.secretarias = result;
  }), error => {
    console.log(error);
  }
}

do_SendAsistencia() {
  //idUsuario, idAfirmacion, idSecretaria, idCategoria, solicitud, email
  //this.correo.push(this.email);
  this.is_loading = true;
  this.correo.push(this.userlogged.correoElectronico);
  let afirmaciones: any[] = [];
  let idAfirmacion = 0;
  this.idAfirmacion2.forEach(element => {
    afirmaciones.push(element.nombre);
    idAfirmacion = element.idAfirmacion;
  });
  //console.log(this.userlogged.idUsuario, this.idAfirmacion, this.userlogged.idSecretaria, this.idCategoria, this.solicitud, this.userlogged.correoElectronico);
  //this.adminService.SendAsistencia(this.userlogged.idUsuario, this.idAfirmacion, this.idSecretaria, this.idCategoria, this.solicitud, this.correo).subscribe(res => {
  this.adminService.SendAsistenciaMulti(this.userlogged.idUsuario, idAfirmacion, this.userlogged.idSecretaria, this.idCategoria, this.solicitud, this.correo, afirmaciones).subscribe(res => {
    console.log(res);
    if (res['message']) {
      this.openModal();
      this.is_loading = false;
    }
  }), error => {
    console.log(error);
    this.is_loading = false;
  }

  this.checkEnvioAsistencia();
}

do_Valid(param, type, max, event) {
  this.characters = this.validator.Validate(param, type, max, event);
  console.log(this.characters);
}
}
