import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreguntasServiceService } from 'src/app/_services/preguntas-service.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './visualizar.component.scss']
})
export class VisualizarComponent {

  componente: any;
  utilidad: any;

  constructor(
    private fb: FormBuilder, 
    public modal: NgbActiveModal, 
    private preguntasService: PreguntasServiceService
  ) { }

  onSubmit() {
    alert('Thanks!');
  }

  ngOnInit() {
    if (this.componente) {
      this.preguntasService.getUtilsByMicrositeAndQuestion(this.componente.idPregunta)
      .subscribe(preguntas => {
        this.utilidad = preguntas;
      });
    }
  }
}
