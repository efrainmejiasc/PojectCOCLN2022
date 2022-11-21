import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

// Models
import { Evento } from 'src/app/_model/calendario/evento.model';

// Service
import { CalendarioService } from 'src/app/_services/calendario/calendario.service';
import { NotificacionBuild, TipoMensaje } from '../../utils/notificacion-build';

@Component({
  selector: 'app-evento-delete',
  templateUrl: './evento-delete.component.html',
  styleUrls: ['./evento-delete.component.scss']
})
export class EventoDeleteComponent implements OnInit {

  evento: Evento;
  notificacion = '';//NotificacionBuild.mensajeCancelacion;

  constructor(
    public modal: NgbActiveModal,
    private calendarioService: CalendarioService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() { }

  close() {
    this.spinner.show();
    this.evento.notificacion = this.notificacion;
    const objNotificacion = NotificacionBuild.get(this.evento, this.evento.EventoTemas, this.evento.tipoDesc, TipoMensaje.cancelacion);
    const formData: FormData = new FormData();
    formData.append('jsonEvent', JSON.stringify({ id: this.evento.id }));
    formData.append('jsonEmail', JSON.stringify(objNotificacion));
    this.calendarioService.deleteEvent(formData)
    .subscribe(response => {
      console.log(response);
      this.spinner.hide();
      this.modal.close(true);
    });
  }
}
