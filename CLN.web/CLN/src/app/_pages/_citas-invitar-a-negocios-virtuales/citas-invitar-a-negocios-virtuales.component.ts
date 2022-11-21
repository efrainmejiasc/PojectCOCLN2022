import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { GestionarDisponibilidadService } from 'src/app/_services/_gestionar-disponibilidad/gestionar-disponibilidad.service';
import { GestionarInvitacionCitasService } from '../../_services/_gestionar-invitacion-cita/gestionar-invitacion-citas.service';

@Component({
  selector: 'app-citas-invitar-a-negocios-virtuales',
  templateUrl: './citas-invitar-a-negocios-virtuales.component.html',
  styleUrls: ['./citas-invitar-a-negocios-virtuales.component.scss']
})
export class CitasInvitarANegociosVirtualesComponent implements OnInit {
  titulo = "PROGRAMAR CITA DE NEGOCIOS VIRTUALES";
  alertaIcono = "assets/imgs/home-editor/alerta.svg";
  interroganteIcono = "assets/imgs/iconos/como_funciona.svg";
  linkTo = "/manage-availability";
  infoAyuda = "A continuación, encontrarás los horarios en los que coinciden tu calendario y el de la empresa a invitar. Selecciona uno: ";

  listaEmpresasAnfitriona: any[];

  empresaAnfitrionaSeleccionada: any = {
    id: 0,
    name: ""
  };

  fechaInvitacion: string = "";
  horaInicioInvitacion: string = "";
  horaFinInvitacion: string = "";

  horaInvitacion: string = "";

  enlaceInvitacion: string;

  listaMotivoCita: any[];
  motivoCitaSeleccionada: any;

  estadoInvitacion: string = "Programada";

  iconoGoogleMeet = "assets/iconos/citas/google-meet.png";
  iconoSkype = "assets/iconos/citas/skype.png";
  iconoZoom = "assets/iconos/citas/zoom.png";

  mostrarInfoOculta: boolean = false;
  infoAyudaHerramienta: string = "";

  datosModalInvitacionEnviada = {
    fechaInvitacion: "",
    horaInvitacion: "",
    empresaInvitada: "",
    industrySector: "",
    enlaceInvitacion: ""
  }

  url: any;
  nitInvitada: string;
  nitAnfitriona: string;

  isPopupConfirmacion: boolean = false;
  mensajePopupConfirmacion: string = "";

  constructor(private dialog: MatDialog, private router: Router,
    // private _gestionarDisponibilidadService: GestionarDisponibilidadService,
    private _gestionarInvitacionCitas: GestionarInvitacionCitasService,
    private layoutService: LayoutService) {
    this.url = this.router.parseUrl(this.router.url);
    // this.obtenetEmpresaInvitada();
    // this.nitInvitada = this.url.queryParams['idcompany'];
    // console.log(this.nitInvitada);
  };

  ngOnInit() {
    this.promise.then(s => {
      this.obtenetEmpresaInvitada();
    
      this.motivoCitaSeleccionada = {
        id: 0,
        name: ""
      }
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

  empresaInvitada: any = {
    id: "",
    name: "",
    industrySector: "",
    nameContact: "",
    emailContact: "",
    telContact: ""
  };
  obtenetEmpresaInvitada() {
    if (!this.url.queryParams['idcompany'])
      return

    this.layoutService.showLoading();

    this._gestionarInvitacionCitas.obtenerInformacionEmpresa(this.url.queryParams['idcompany']).subscribe(
      ({ data }) => {
        // console.log("obtenerEmpresaInvitada idCompany", data);
        if (!data.numberId) {
          this.layoutService.closeLoading();
          return;
        }
        this.nitInvitada = data.numberId;
        this._gestionarInvitacionCitas.getHorariosDisponibles(this.nitInvitada).subscribe(
          (res) => {
            // console.log("obtenerEmpresaInvitada nit", res);
            if (!res.data) {
              return;
              // existeDisponibilidad = false;
            }
            // this.nitInvitada = "123456789-5";
            this.empresaInvitada = {
              id: res.data.NumberId,
              name: res.data.CompanyName,
              industrySector: res.data.IndustryMainSector,
              // nameContact: res.data.characterization,
              emailContact: res.data.Email,
              telContact: res.data.Phonenumber
            }
            this.layoutService.closeLoading();

            this.obtenerEmpresas();
            this.obtenerMotivos();
          }
        );
        (error: any) => {
          console.log(error);
          this.layoutService.closeLoading();
        };
      }
    );
    (error: any) => {
      console.log(error);
      this.layoutService.closeLoading();
    };
  }

  existeDisponibilidad: boolean = true;
  funExisteDisponibilidad(event: boolean) {
    this.existeDisponibilidad = event;
  }

  obtenerEmpresas(): void {
    const usuario = JSON.parse(localStorage.getItem("userCas"));
    // console.log("usuario logeado", usuario);
    if (!usuario || !usuario.id) {
      return;
    }
    this.layoutService.showLoading();

    // console.log("empresas anfitrionas");
    this._gestionarInvitacionCitas.getUserCompanies(usuario.id).subscribe(
      ({ data }) => {

        if (data.length) {

          this.listaEmpresasAnfitriona = [];
          data.forEach((data: any) => {
            if (data.numberId != this.empresaInvitada.id) {

              let empresa = {
                ...data,
                id: data.companyId,
                name: data.companyName
              }
              // console.log("Empresa anfitriona", empresa);
              delete empresa.companyId;
              delete empresa.companyName;

              this.listaEmpresasAnfitriona = [...this.listaEmpresasAnfitriona, empresa];
              return empresa;
            }
          })
          // console.log("this.listaEmpresasAnfitriona", this.listaEmpresasAnfitriona);

          if (this.listaEmpresasAnfitriona.length === 1) {
            // this.idEmpresaAnfitrionaSeleccionada(this.listaEmpresasAnfitriona[0].id)
            this.empresaAnfitrionaSeleccionada = this.listaEmpresasAnfitriona[0];
            this.nitAnfitriona = this.empresaAnfitrionaSeleccionada.numberId
          }
        }
        else {
          console.log("El usuario no tiene empresas");
        }
        this.layoutService.closeLoading();
      }
    );
    (error: any) => {
      console.log(error);
      this.layoutService.closeLoading();
    };
  }

  idEmpresaAnfitrionaSeleccionada(id: number) {
    // console.log("idEmpresaAnfitrionaSeleccionada", id);

    this.empresaAnfitrionaSeleccionada = null;
    if (id > 0) {
      for (let i = 0; i < this.listaEmpresasAnfitriona.length; i++) {
        // console.log("this.listaEmpresasAnfitriona", this.listaEmpresasAnfitriona);
        
        const item = this.listaEmpresasAnfitriona[i];
        if (item.id === id) {
          this.nitAnfitriona = item.numberId;
          this.empresaAnfitrionaSeleccionada = item;
          // setTimeout(this.fun(item), 1000);
          // this.fun(item);
        };
      };
    }
    // console.log("this.empresaAnfitrionaSeleccionada", this.empresaAnfitrionaSeleccionada);
  }

  fechaCalendario: any;
  fechaCalendarioEscogida(event: any) {
    if (event) {
      this.fechaCalendario = event;
      // console.log("this.fechaCalendario", this.fechaCalendario);
      if (event.fecha, event.horaInicio, event.horaFin) {
        this.fechaInvitacion = event.fecha;
        this.horaInicioInvitacion = event.horaInicio;
        this.horaFinInvitacion = event.horaFin;
      }
    }
  }

  obtenerMotivos(): void {
    this.layoutService.showLoading();
    this._gestionarInvitacionCitas.getReasonVirtualAppointments().subscribe(
      ({ data }) => {

        if (data.length) {
          this.listaMotivoCita = data.map((data: any) => {
            let empresa = {
              ...data,
              id: data.enumerator
            }
            return empresa;
          })
        }
        else {
          console.log("No hay motivos");
        }
        this.layoutService.closeLoading();
      }
    );
    (error: any) => {
      console.log(error);
      this.layoutService.closeLoading();
    };
  }

  idMotivoCitaSeleccionada(id: number) {
    this.motivoCitaSeleccionada = null;

    for (let i = 0; i < this.listaMotivoCita.length; i++) {
      const item = this.listaMotivoCita[i];
      if (item.id === id) {
        this.motivoCitaSeleccionada = item;
      };
    };
  }

  palancaInfoOculta() {
    this.mostrarInfoOculta = !this.mostrarInfoOculta;
  }

  mostrarInfoHerramienta(key: string) {
    switch (key) {
      case 'googe-meet':
        this.infoAyudaHerramienta = `Necesitas tener una cuenta en gmail. Da clic en “Reunión nueva”, 
        a continuación, da clic en “Crear una reunión para más tarde”, 
        copia el link de la reunión, pégalo en el siguiente campo de texto.`;
        break;
      case 'skype':
        this.infoAyudaHerramienta = `Da clic en el botón “Realizar una videollamada gratis”, 
        asigne un nombre a la reunión, ejemplo: “reunión de negocios”, 
        a continuación, da clic en el botón “Crear una videollamada gratuita”, 
        copia el link de la reunión, pégalo en el siguiente campo de texto.`;
        break;
      case 'zoom':
        this.infoAyudaHerramienta = `Necesitas tener una cuenta en Zoom e Iniciar sesión, 
          da clic en “Programar una reunión” diligencia la información y da clic en guardar, 
          a continuación, aparecerán todos los datos de la reunión,
          copia el link de la reunión, pégalo en el siguiente campo de texto.`;
        break;
      default:
        this.infoAyudaHerramienta = "";
        break;
    }
  }

  isBtnInvitar() {
    return (
      this.fechaInvitacion && this.horaInicioInvitacion && this.horaFinInvitacion
      && this.empresaAnfitrionaSeleccionada.id && this.nitInvitada
      && this.motivoCitaSeleccionada.name && this.estadoInvitacion
      && this.enlaceInvitacion
    );
  }

  herramientaApp(url: string) {
    if (!url)
      return "app";
    if (url.includes("meet.google.com")) {
      return "meet";
    }
    if (url.includes("zoom.us")) {
      return "zoom";
    }
    if (url.includes("skype.com")) {
      return "skype";
    }
    return "app"
  }

  invitar(dialogTemplate: any) {
    const dataCreacion = {
      "numberId": this.nitAnfitriona,
      "guestIdNumber": this.nitInvitada,
      "appointmentReason": this.motivoCitaSeleccionada.name,
      "appointmentDate": this.fechaInvitacion,
      "startHour": this.horaInicioInvitacion,
      "endHour": this.horaFinInvitacion,
      "app": this.herramientaApp(this.enlaceInvitacion),
      "link": this.enlaceInvitacion,
      "idState": 1,
      "idStateGuest": 0
    }

    this.layoutService.showLoading();

    // try {
      this._gestionarInvitacionCitas.crearCitaVirtual(dataCreacion).subscribe(
        (res: any) => {
          // console.log("crearCita", res);
          if (res.succeeded) {
            this.datosModalInvitacionEnviada = {
              fechaInvitacion: this.formatoDeFecha(new Date(dataCreacion.appointmentDate)),
              horaInvitacion: dataCreacion.startHour + " - " + dataCreacion.endHour,
              empresaInvitada: this.empresaInvitada.name,
              industrySector: this.empresaInvitada.industrySector,
              enlaceInvitacion: dataCreacion.link
            }
            this.abrirDialogTemplate(dialogTemplate);
          } else {
            this.mensajePopupConfirmacion = res.message;
            this.isPopupConfirmacion = true;
          }
          this.layoutService.closeLoading();
        }
      );
      (error: any) => {
        console.log(error);
        this.layoutService.closeLoading();
      };
  }
  formatoDeFecha(fecha: Date) {
    // Creamos array con los meses del año
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    // Creamos array con los días de la semana
    const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    // Creamos el objeto fecha instanciándolo con la clase Date
    // const fecha = new Date();
    // Construimos el formato de salida
    const fechaFormateada = (dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + '/' + fecha.getUTCFullYear());
    if (fechaFormateada)
      return fechaFormateada;
    return fecha.toString();
  }

  abrirDialogTemplate(templateRef: any) {
    this.dialog.open(templateRef, {
      width: '50%'
    });
  }
  cerrarDialogTemplate() {
    this.datosModalInvitacionEnviada = {
      fechaInvitacion: "",
      horaInvitacion: "",
      empresaInvitada: "",
      industrySector: "",
      enlaceInvitacion: ""
    }
    // this.router.navigate([this.linkTo]);
    // console.log("this.empresaAnfitrionaSeleccionada", this.empresaAnfitrionaSeleccionada);
    
    const queryParams = { tab: 'host-scheduled-appointments', idcompany: this.empresaAnfitrionaSeleccionada.id }
    // console.log("queryParams", queryParams);
    this.router.navigate([this.linkTo], { queryParams });
    
    this.dialog.closeAll();
  }

  mostrarModalFecha = false;

  closePopupCambios(valor: boolean): void {
    this.mostrarModalFecha = !this.mostrarModalFecha;
  }

  closePopupConfimacion(event: boolean) {
    this.isPopupConfirmacion = false;
    this.mensajePopupConfirmacion = "";
  }
}
