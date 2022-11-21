import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';

// Service
import { CalendarioService } from 'src/app/_services/calendario/calendario.service';

// Components
import { EventoFormComponent } from '../../modals/evento-form/evento-form.component';
import { EventoDeleteComponent } from '../../modals/evento-delete/evento-delete.component';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';

// Utils
import { CalendarConfig } from '../../utils/calendar-config';
import { NgxSpinnerService } from 'ngx-spinner';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { Router } from '@angular/router';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { NotificationComponent } from '../../modals/notification/notification.component';

@Component({
  selector: 'app-calendario-admin',
  templateUrl: './calendario-admin.component.html',
  styleUrls: ['./calendario-admin.component.scss',
    "../../../../_shared/styles/modals.scss",]
})
export class CalendarioAdminComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private calendarioService: CalendarioService,
    private spinner: NgxSpinnerService,
    private gestorRolesService: GestorRolesService,
    private router: Router,
    private permitService: PermitServiceService,
    private auth: AuthenticationService
  ) { }
  events: CalendarEvent[] = [];
  private permiteCrear = false;
  actions: CalendarEventAction[] = [
    {
      label: '<img src="assets/iconos/men/evs-eliminar.svg" alt="Eliminar" class="link-btn-calendario">',
      a11yLabel: 'Eliminar',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      },
    },
    {
      label: '<img src="assets/iconos/men/evs-editar.svg" alt="Editar" class="link-btn-calendario">',
      a11yLabel: 'Editar',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.editEvent(event);
      },
    },
    {
      label: '<img src="assets/iconos/men/evs-ojo.svg" alt="Visualizar" class="link-btn-calendario">',
      a11yLabel: 'Visualizar',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.getEventDetail(event.id.toString());
      },
    },
    {
      label: '<img src="assets/iconos/men/enviar-correo.svg" alt="Notificación" class="link-btn-calendario">',
      a11yLabel: 'Notificación',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.openNotification(event);
      },
    },
  ];

  evento: CalendarEvent;

  private messageAlertError = 'No hemos podido resolver tu solicitud, por favor vuelve a intentarlo';
  public permitsUser: permitsUserFetch = new permitsUserFetch();

  /*getPermisos() {
    const idItem = parseInt(localStorage.getItem('session'));
    this.gestorRolesService.getPermitsComponent(idItem).subscribe((res) => {
      const permisos: CalendarEventAction[] = [];
      for (const permisoThere of res) {
        for (const permisoHere of this.actions) {
          // console.log(permisoHere['a11yLabel']);
          if (permisoThere.permiso.includes(permisoHere.a11yLabel)) {
            permisos.push(permisoHere);
          }
        }
        if (permisoThere['permiso'].includes('Crear')) {
          this.permiteCrear = true;
        }
      }
      permisos.push(this.actions[2]);
      this.actions = permisos;
      this.fetchEventos();
    });
  }*/

  ngOnInit() {
    this.validSession();
  }

  userlogged: any;
  protected validSession() {
    if (localStorage.getItem('session') !== undefined) {
      const menuItem = localStorage.getItem('session');
      localStorage.removeItem("session");
      this.permitsAnalitics(menuItem);
    } else {
      this.auth.actualUser$.subscribe((data) => {
        this.userlogged = data;
        (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
      });
    }
  }

  protected permitsAnalitics(item) {
    this.gestorRolesService.getPermitsComponent(item)
      .subscribe(data => {
        if (data.length > 0) {
          this.permitsUser = this.permitService.fetchPermits(data);
          // Inicializar componente
          this.spinner.hide();
          this.fetchEventos();
        } else {
          this.auth.actualUser$.subscribe((data) => {
            this.userlogged = data;
            (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
          });
        }
      }, error => {
        const ref = this.modalService.open(AlertModalComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false
        });
        ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${this.messageAlertError}</p>`;
        this.auth.actualUser$.subscribe((data) => {
          this.userlogged = data;
          (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
        });
      });
  }

  fetchEventos() {
    const currentDate = new Date();
    this.calendarioService
      .getEventbyYear(currentDate.toDateString())
      .subscribe((response) => {
        response.forEach((evento) => {
          this.events = [
            ...this.events,
            CalendarConfig.convertinit(evento, this.actions),
          ];
        });
      });
    const nextyear = new Date(currentDate.getFullYear() + 1, 0, 1);
    this.calendarioService
      .getEventbyMonth(nextyear.toDateString())
      .subscribe((response) => {
        response.forEach((evento) => {
          this.events = [
            ...this.events,
            CalendarConfig.convertinit(evento, this.actions),
          ];
        });
      });
  }

  addEvent(): void {
    const ref = this.modalService.open(EventoFormComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    ref.result.then(
      (response) => {
        this.spinner.show();
        this.events = [];
        this.fetchEventos();
        this.spinner.hide();
        this.openAlert('Se ha creado el evento correctamente');
      },
      (cancel) => {
      }
    );
  }

  editEvent(eventToEdit: CalendarEvent): void {
    const ref = this.modalService.open(EventoFormComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    ref.componentInstance.id = eventToEdit.id.toString();
    ref.result.then(
      (response) => {
        this.spinner.show();
        this.events = [];
        this.fetchEventos();
        this.spinner.hide();
        this.openAlert('Se ha editado el evento correctamente');
      },
      (cancel) => {
      }
    );
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    const ref = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    ref.componentInstance.message = `
      <p><b>¿Desea eliminar el evento?</b></p>
      <p>Recuerde que toda la información asociada al evento será borrada del sistema</p>`;
    ref.result.then((confirm) => {
      // Se confirma eliminación
      if (confirm) {
        // Consulta de detalles de evento
        this.calendarioService
          .getEventDetail(eventToDelete.id.toString())
          .subscribe((resultevent) => {
            const evento = resultevent[0];
            if (evento.privado) {
              // Si el evento es privado, se muestra modal de eliminación con mensaje
              const alertDelete = this.modalService.open(
                EventoDeleteComponent,
                {
                  size: 'lg',
                  centered: true,
                  backdrop: 'static',
                  keyboard: false,
                }
              );
              alertDelete.componentInstance.evento = evento;
              alertDelete.result.then((deleteresponse) => {
                // Se confirma eliminación de evento privado
                if (deleteresponse) {
                  this.events = [];
                  this.fetchEventos();
                  this.openAlert(
                    `El evento <b>${eventToDelete.title}</b> y toda su información ha sido borrada del sistema.`
                  );
                }
              });
            } else {
              // Si el evento es publico se elimina de inmendiato
              this.callServiceDelete(eventToDelete);
            }
          });
      }
    });
  }

  // Método que hace un llamado al servicio de eliminación de un evento
  callServiceDelete(eventToDelete: CalendarEvent) {
    this.spinner.show();
    const formData: FormData = new FormData();
    formData.append('jsonEvent', JSON.stringify({ id: eventToDelete.id }));
    formData.append('jsonEmail', '');
    this.calendarioService.deleteEvent(formData).subscribe((response) => {
      this.events = [];
      this.fetchEventos();
      this.spinner.hide();
      this.openAlert(
        `El evento <b>${eventToDelete.title}</b> y toda su información ha sido borrada del sistema.`
      );
    });
  }

  // Método que consume el detalle de un evento
  getEventDetail(id: string) {
    this.calendarioService.getEventDetail(id).subscribe((response) => {
      this.evento = response[0];
    });
  }

  // Habre un modal con un mensaje dinamico
  openAlert(msg: string) {
    const alert = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    alert.componentInstance.message = msg;
  }

  openNotification(data) {
    if (new Date(data.start) <= new Date()) {
      this.openAlert("El evento no tiene permitido enviar correos");
      return;
    }
    let date: Date = new Date();
    const dialogRef = this.modalService.open(NotificationComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    dialogRef.componentInstance.id = data.id;
  }
}
