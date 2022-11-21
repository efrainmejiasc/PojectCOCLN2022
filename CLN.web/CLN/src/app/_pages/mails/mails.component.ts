import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.scss']
})
export class MailsComponent implements OnInit {

  constrataciones = [
    {
      id: '1',
      title: 'Proceso de constratacion 1',
      entidad: 'Contraloria',
      objeto: 'Fortalecimiento regional',
      precio: '$12.000.000.000',
    },
    {
      id: '2',
      title: 'Proceso de constratacion 2',
      entidad: 'Contraloria',
      objeto: 'Fortalecimiento regional',
      precio: '$12.000.000.000',
    },
    {
      id: '3',
      title: 'Proceso de constratacion 3',
      entidad: 'Contraloria',
      objeto: 'Fortalecimiento regional',
      precio: '$12.000.000.000',
    },
    {
      id: '4',
      title: 'Proceso de constratacion 4',
      entidad: 'Contraloria',
      objeto: 'Fortalecimiento regional',
      precio: '$12.000.000.000',
    },
    {
      id: '5',
      title: 'Proceso de constratacion 5',
      entidad: 'Contraloria',
      objeto: 'Fortalecimiento regional',
      precio: '$12.000.000.000',
    },
    {
      id: '6',
      title: 'Proceso de constratacion 6',
      entidad: 'Contraloria',
      objeto: 'Fortalecimiento regional',
      precio: '$12.000.000.000',
    }
  ];

  adquisiciones = [
    {
      id: '1',
      title: 'Adquisiciones disponibles 1',
      entidad: 'Contraloria',
      descripcion: 'Fortalecimiento regional',
      valor_adquisicion: '$12.000.000.000',
      fecha_inicio_proceso: '2021-05-12',
      modalidad: '$12.000.000.000',
    },
    {
      id: '2',
      title: 'Adquisiciones disponibles 2',
      entidad: 'Contraloria',
      descripcion: 'Fortalecimiento regional',
      valor_adquisicion: '$12.000.000.000',
      fecha_inicio_proceso: '2021-05-12',
      modalidad: '$12.000.000.000',
    },
    {
      id: '3',
      title: 'Adquisiciones disponibles 3',
      entidad: 'Contraloria',
      descripcion: 'Fortalecimiento regional',
      valor_adquisicion: '$12.000.000.000',
      fecha_inicio_proceso: '2021-05-12',
      modalidad: '$12.000.000.000',
    },
    {
      id: '4',
      title: 'Adquisiciones disponibles 4',
      entidad: 'Contraloria',
      descripcion: 'Fortalecimiento regional',
      valor_adquisicion: '$12.000.000.000',
      fecha_inicio_proceso: '2021-05-12',
      modalidad: '$12.000.000.000',
    },
    {
      id: '5',
      title: 'Adquisiciones disponibles 5',
      entidad: 'Contraloria',
      descripcion: 'Fortalecimiento regional',
      valor_adquisicion: '$12.000.000.000',
      fecha_inicio_proceso: '2021-05-12',
      modalidad: '$12.000.000.000',
    },
    {
      id: '6',
      title: 'Adquisiciones disponibles 6',
      entidad: 'Contraloria',
      descripcion: 'Fortalecimiento regional',
      valor_adquisicion: '$12.000.000.000',
      fecha_inicio_proceso: '2021-05-12',
      modalidad: '$12.000.000.000',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
