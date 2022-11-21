import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contenido-list',
  templateUrl: './contenido-list.component.html',
  styleUrls: ['./contenido-list.component.scss']
})
export class ContenidoListComponent implements OnInit {

  hayContenidos: boolean;
  contenidos: any[] = [];
  contenidosResult: any[] = [];

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.contenidosResult = this.contenidos;
    this.hayContenidos = this.contenidosResult.length > 0;
  }

  async eliminar(contenido: any) {
    const index = this.contenidosResult.indexOf(contenido);
    if (index > -1) {
      this.contenidos.splice(index, 1);
      this.hayContenidos = this.contenidosResult.length > 0;
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const json: any[] = [];
      let nuevoorden = 0;
      event.container.data.forEach(element => {
        json.push({
          idContenido: element.idPregunta,
          descripcion: element.descripcion,
          fecha:  element.fecha,
          nombre: element.titulo,
          ruta: element.ruta,
          tipoContenido: element.TipoContenido
        });
        nuevoorden++;
      });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  save() {
    this.modal.close({ contenidos: this.contenidosResult, hayContenidos: this.hayContenidos });
  }
}
