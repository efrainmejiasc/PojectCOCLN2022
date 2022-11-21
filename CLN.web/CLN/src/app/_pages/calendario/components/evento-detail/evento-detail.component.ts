import { Component, Input, OnInit } from '@angular/core';

// Models
import { Evento } from 'src/app/_model/calendario/evento.model';

// Services
import { CalendarioService } from 'src/app/_services/calendario/calendario.service';

// Utils
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evento-detail',
  templateUrl: './evento-detail.component.html',
  styleUrls: ['./evento-detail.component.scss',
    "../../../../_shared/styles/modals.scss"]
})
export class EventoDetailComponent implements OnInit {

  @Input() evento: Evento;
  url = `${environment.apiUrl}/api/contenido/downloadContent?ruta=`;
  private user = JSON.parse(localStorage.getItem('actualUser'));
  showDetailsEvent = false;

  constructor(
    private calendarioService: CalendarioService
  ) { }

  ngOnInit() {
    this.showDetailsEvent = this.user !== null;
  }
}
