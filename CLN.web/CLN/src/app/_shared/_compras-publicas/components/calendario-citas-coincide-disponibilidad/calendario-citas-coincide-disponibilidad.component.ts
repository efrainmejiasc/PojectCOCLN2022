import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { GestionarDisponibilidadService } from 'src/app/_services/_gestionar-disponibilidad/gestionar-disponibilidad.service';

type infoDisponibilidadGeneral = {
  "Id": number,
  "NumberId": string,
  "CompanyName": string,
  "Email": string,
  "IndustryMainSector": any,
  "Status": number,
  "DateCreate": string,
  "IdUserCreate": number,
  "DateUpdate": string,
  "IdUserUpdate": number,
  "Monday": {
    "IdDetail": number,
    "NumberIdDetail": string,
    "WeekDay": string,
    "S_05_06": boolean,
    "V_05_06": boolean,
    "S_06_07": boolean,
    "V_06_07": boolean,
    "S_07_08": boolean,
    "V_07_08": boolean,
    "S_08_09": boolean,
    "V_08_09": boolean,
    "S_09_10": boolean,
    "V_09_10": boolean,
    "S_10_11": boolean,
    "V_10_11": boolean,
    "S_11_12": boolean,
    "V_11_12": boolean,
    "S_12_13": boolean,
    "V_12_13": boolean,
    "S_13_14": boolean,
    "V_13_14": boolean,
    "S_14_15": boolean,
    "V_14_15": boolean,
    "S_15_16": boolean,
    "V_15_16": boolean,
    "S_16_17": boolean,
    "V_16_17": boolean,
    "S_17_18": boolean,
    "V_17_18": boolean,
    "S_18_19": boolean,
    "V_18_19": boolean,
    "S_19_20": boolean,
    "V_19_20": boolean,
    "SelectedDay": boolean
  },
  "Tuesday": {
    "IdDetail": number,
    "NumberIdDetail": string,
    "WeekDay": string,
    "S_05_06": boolean,
    "V_05_06": boolean,
    "S_06_07": boolean,
    "V_06_07": boolean,
    "S_07_08": boolean,
    "V_07_08": boolean,
    "S_08_09": boolean,
    "V_08_09": boolean,
    "S_09_10": boolean,
    "V_09_10": boolean,
    "S_10_11": boolean,
    "V_10_11": boolean,
    "S_11_12": boolean,
    "V_11_12": boolean,
    "S_12_13": boolean,
    "V_12_13": boolean,
    "S_13_14": boolean,
    "V_13_14": boolean,
    "S_14_15": boolean,
    "V_14_15": boolean,
    "S_15_16": boolean,
    "V_15_16": boolean,
    "S_16_17": boolean,
    "V_16_17": boolean,
    "S_17_18": boolean,
    "V_17_18": boolean,
    "S_18_19": boolean,
    "V_18_19": boolean,
    "S_19_20": boolean,
    "V_19_20": boolean,
    "SelectedDay": boolean
  },
  "Wednesday": {
    "IdDetail": number,
    "NumberIdDetail": string,
    "WeekDay": string,
    "S_05_06": boolean,
    "V_05_06": boolean,
    "S_06_07": boolean,
    "V_06_07": boolean,
    "S_07_08": boolean,
    "V_07_08": boolean,
    "S_08_09": boolean,
    "V_08_09": boolean,
    "S_09_10": boolean,
    "V_09_10": boolean,
    "S_10_11": boolean,
    "V_10_11": boolean,
    "S_11_12": boolean,
    "V_11_12": boolean,
    "S_12_13": boolean,
    "V_12_13": boolean,
    "S_13_14": boolean,
    "V_13_14": boolean,
    "S_14_15": boolean,
    "V_14_15": boolean,
    "S_15_16": boolean,
    "V_15_16": boolean,
    "S_16_17": boolean,
    "V_16_17": boolean,
    "S_17_18": boolean,
    "V_17_18": boolean,
    "S_18_19": boolean,
    "V_18_19": boolean,
    "S_19_20": boolean,
    "V_19_20": boolean,
    "SelectedDay": boolean
  },
  "Thursday": {
    "IdDetail": number,
    "NumberIdDetail": string,
    "WeekDay": string,
    "S_05_06": boolean,
    "V_05_06": boolean,
    "S_06_07": boolean,
    "V_06_07": boolean,
    "S_07_08": boolean,
    "V_07_08": boolean,
    "S_08_09": boolean,
    "V_08_09": boolean,
    "S_09_10": boolean,
    "V_09_10": boolean,
    "S_10_11": boolean,
    "V_10_11": boolean,
    "S_11_12": boolean,
    "V_11_12": boolean,
    "S_12_13": boolean,
    "V_12_13": boolean,
    "S_13_14": boolean,
    "V_13_14": boolean,
    "S_14_15": boolean,
    "V_14_15": boolean,
    "S_15_16": boolean,
    "V_15_16": boolean,
    "S_16_17": boolean,
    "V_16_17": boolean,
    "S_17_18": boolean,
    "V_17_18": boolean,
    "S_18_19": boolean,
    "V_18_19": boolean,
    "S_19_20": boolean,
    "V_19_20": boolean,
    "SelectedDay": boolean
  },
  "Friday": {
    "IdDetail": number,
    "NumberIdDetail": string,
    "WeekDay": string,
    "S_05_06": boolean,
    "V_05_06": boolean,
    "S_06_07": boolean,
    "V_06_07": boolean,
    "S_07_08": boolean,
    "V_07_08": boolean,
    "S_08_09": boolean,
    "V_08_09": boolean,
    "S_09_10": boolean,
    "V_09_10": boolean,
    "S_10_11": boolean,
    "V_10_11": boolean,
    "S_11_12": boolean,
    "V_11_12": boolean,
    "S_12_13": boolean,
    "V_12_13": boolean,
    "S_13_14": boolean,
    "V_13_14": boolean,
    "S_14_15": boolean,
    "V_14_15": boolean,
    "S_15_16": boolean,
    "V_15_16": boolean,
    "S_16_17": boolean,
    "V_16_17": boolean,
    "S_17_18": boolean,
    "V_17_18": boolean,
    "S_18_19": boolean,
    "V_18_19": boolean,
    "S_19_20": boolean,
    "V_19_20": boolean,
    "SelectedDay": boolean
  },
  "Saturday": {
    "IdDetail": number,
    "NumberIdDetail": string,
    "WeekDay": string,
    "S_05_06": boolean,
    "V_05_06": boolean,
    "S_06_07": boolean,
    "V_06_07": boolean,
    "S_07_08": boolean,
    "V_07_08": boolean,
    "S_08_09": boolean,
    "V_08_09": boolean,
    "S_09_10": boolean,
    "V_09_10": boolean,
    "S_10_11": boolean,
    "V_10_11": boolean,
    "S_11_12": boolean,
    "V_11_12": boolean,
    "S_12_13": boolean,
    "V_12_13": boolean,
    "S_13_14": boolean,
    "V_13_14": boolean,
    "S_14_15": boolean,
    "V_14_15": boolean,
    "S_15_16": boolean,
    "V_15_16": boolean,
    "S_16_17": boolean,
    "V_16_17": boolean,
    "S_17_18": boolean,
    "V_17_18": boolean,
    "S_18_19": boolean,
    "V_18_19": boolean,
    "S_19_20": boolean,
    "V_19_20": boolean,
    "SelectedDay": boolean
  },
  "Sunday": {
    "IdDetail": number,
    "NumberIdDetail": string,
    "WeekDay": string,
    "S_05_06": boolean,
    "V_05_06": boolean,
    "S_06_07": boolean,
    "V_06_07": boolean,
    "S_07_08": boolean,
    "V_07_08": boolean,
    "S_08_09": boolean,
    "V_08_09": boolean,
    "S_09_10": boolean,
    "V_09_10": boolean,
    "S_10_11": boolean,
    "V_10_11": boolean,
    "S_11_12": boolean,
    "V_11_12": boolean,
    "S_12_13": boolean,
    "V_12_13": boolean,
    "S_13_14": boolean,
    "V_13_14": boolean,
    "S_14_15": boolean,
    "V_14_15": boolean,
    "S_15_16": boolean,
    "V_15_16": boolean,
    "S_16_17": boolean,
    "V_16_17": boolean,
    "S_17_18": boolean,
    "V_17_18": boolean,
    "S_18_19": boolean,
    "V_18_19": boolean,
    "S_19_20": boolean,
    "V_19_20": boolean,
    "SelectedDay": boolean
  }
}

@Component({
  selector: 'app-calendario-citas-coincide-disponibilidad',
  templateUrl: './calendario-citas-coincide-disponibilidad.component.html',
  styleUrls: ['./calendario-citas-coincide-disponibilidad.component.scss']
})
export class CalendarioCitasCoincideDisponibilidadComponent implements OnInit, OnChanges {

  @Input() message: string;
  @Input() nitEmpresaInvitada: string;
  @Input() nitEmpresaAnfitriona: string;
  @Output() close = new EventEmitter<any>();
  @Output() fechaCalendario = new EventEmitter<any>();
  @Output() existeDisponibilidad = new EventEmitter<boolean>();

  isCalendario: boolean = false;

  fechaSeleccionada: string = "";
  horaSeleccionada: string = "";

  showAlertInfo: boolean = false;
  diaInicial: Date;

  fechaActual: Date = new Date();
  fechaActualSemana: any;
  fechaFinalSemana: any;

  mes = '';
  ano: number;
  semana = [
    {
      name: 'Domingo',
      dia: 0,
      mes: 0,
      ano: 0,
      fullDate: new Date()
    },
    {
      name: 'Lunes',
      dia: 0,
      mes: 0,
      ano: 0,
      fullDate: new Date()
    },
    {
      name: 'Martes',
      dia: 0,
      mes: 0,
      ano: 0,
      fullDate: new Date()
    },
    {
      name: 'Miercoles',
      dia: 0,
      mes: 0,
      ano: 0,
      fullDate: new Date()
    },
    {
      name: 'Jueves',
      dia: 0,
      mes: 0,
      ano: 0,
      fullDate: new Date()
    },
    {
      name: 'Viernes',
      dia: 0,
      mes: 0,
      ano: 0,
      fullDate: new Date()
    },
    {
      name: 'Sabado',
      dia: 0,
      mes: 0,
      ano: 0,
      fullDate: new Date()
    },
  ];

  listadoMeses = [
    {
      id: 0,
      name: 'Enero',
    },
    {
      id: 1,
      name: 'Febrero',
    },
    {
      id: 2,
      name: 'Marzo',
    },
    {
      id: 3,
      name: 'Abril',
    },
    {
      id: 4,
      name: 'Mayo',
    },
    {
      id: 5,
      name: 'Junio',
    },
    {
      id: 6,
      name: 'Julio',
    },
    {
      id: 7,
      name: 'Agosto',
    },
    {
      id: 8,
      name: 'Septiembre',
    },
    {
      id: 9,
      name: 'Octubre',
    },
    {
      id: 10,
      name: 'Noviembre',
    },
    {
      id: 11,
      name: 'Diciembre',
    },
  ];

  mounth = {
    id: '',
    name: '',
    currentWeek: [
      {
        id: 1,
        name: 'Domingo',
        key: 'Sunday',
        date: '',
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time: '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            assigned: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time: '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            assigned: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time: '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            assigned: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time: '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            assigned: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time: '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            assigned: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time: '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            assigned: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time: '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            assigned: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time: '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            assigned: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time: '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            assigned: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time: '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            assigned: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time: '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            assigned: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time: '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            assigned: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time: '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            assigned: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time: '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            assigned: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time: '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            assigned: false
          },
        ]
      },
      {
        id: 2,
        name: 'Lunes',
        key: 'Monday',
        date: '',
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time: '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            assigned: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time: '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            assigned: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time: '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            assigned: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time: '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            assigned: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time: '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            assigned: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time: '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            assigned: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time: '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            assigned: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time: '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            assigned: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time: '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            assigned: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time: '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            assigned: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time: '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            assigned: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time: '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            assigned: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time: '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            assigned: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time: '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            assigned: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time: '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            assigned: false
          },
        ]
      },
      {
        id: 3,
        name: 'Martes',
        key: 'Tuesday',
        date: '',
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time: '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            assigned: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time: '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            assigned: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time: '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            assigned: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time: '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            assigned: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time: '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            assigned: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time: '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            assigned: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time: '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            assigned: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time: '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            assigned: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time: '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            assigned: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time: '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            assigned: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time: '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            assigned: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time: '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            assigned: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time: '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            assigned: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time: '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            assigned: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time: '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            assigned: false
          },
        ]
      },
      {
        id: 4,
        name: 'Miercoles',
        key: 'Wednesday',
        date: '',
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time: '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            assigned: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time: '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            assigned: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time: '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            assigned: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time: '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            assigned: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time: '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            assigned: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time: '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            assigned: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time: '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            assigned: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time: '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            assigned: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time: '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            assigned: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time: '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            assigned: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time: '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            assigned: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time: '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            assigned: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time: '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            assigned: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time: '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            assigned: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time: '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            assigned: false
          },
        ]
      },
      {
        id: 5,
        name: 'Jueves',
        key: 'Thursday',
        date: '',
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time: '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            assigned: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time: '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            assigned: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time: '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            assigned: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time: '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            assigned: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time: '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            assigned: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time: '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            assigned: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time: '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            assigned: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time: '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            assigned: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time: '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            assigned: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time: '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            assigned: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time: '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            assigned: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time: '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            assigned: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time: '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            assigned: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time: '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            assigned: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time: '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            assigned: false
          },
        ]
      },
      {
        id: 6,
        name: 'Viernes',
        key: 'Friday',
        date: '',
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time: '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            assigned: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time: '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            assigned: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time: '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            assigned: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time: '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            assigned: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time: '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            assigned: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time: '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            assigned: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time: '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            assigned: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time: '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            assigned: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time: '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            assigned: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time: '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            assigned: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time: '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            assigned: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time: '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            assigned: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time: '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            assigned: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time: '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            assigned: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time: '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            assigned: false
          },
        ]
      },
      {
        id: 7,
        name: 'Sabado',
        key: 'Saturday',
        date: '',
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time: '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            assigned: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time: '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            assigned: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time: '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            assigned: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time: '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            assigned: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time: '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            assigned: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time: '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            assigned: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time: '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            assigned: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time: '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            assigned: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time: '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            assigned: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time: '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            assigned: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time: '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            assigned: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time: '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            assigned: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time: '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            assigned: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time: '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            assigned: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time: '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            assigned: false
          },
        ]
      },
    ],
  };

  hours = [
    {
      id: 1,
      text: '05:00 - 06:00',
      time: '05:00',
      selected: false,
    },
    {
      id: 2,
      text: '06:00 - 07:00',
      time: '06:00',
      selected: false,
    },
    {
      id: 3,
      text: '07:00 - 08:00',
      time: '07:00',
      selected: false,
    },
    {
      id: 4,
      text: '08:00 - 09:00',
      time: '08:00',
      selected: false,
    },
    {
      id: 5,
      text: '09:00 - 10:00',
      time: '09:00',
      selected: false,
    },
    {
      id: 6,
      text: '10:00 - 11:00',
      time: '10:00',
      selected: false,
    },
    {
      id: 7,
      text: '11:00 - 12:00',
      time: '11:00',
      selected: false,
    },
    {
      id: 8,
      text: '12:00 - 13:00',
      time: '12:00',
      selected: false,
    },
    {
      id: 9,
      text: '13:00 - 14:00',
      time: '13:00',
      selected: false,
    },
    {
      id: 10,
      text: '14:00 - 15:00',
      time: '14:00',
      selected: false,
    },
    {
      id: 11,
      text: '15:00 - 16:00',
      time: '15:00',
      selected: false,
    },
    {
      id: 12,
      text: '16:00 - 17:00',
      time: '16:00',
      selected: false,
    },
    {
      id: 13,
      text: '17:00 - 18:00',
      time: '17:00',
      selected: false,
    },
    {
      id: 14,
      text: '18:00 - 19:00',
      time: '18:00',
      selected: false,
    },
    {
      id: 15,
      text: '19:00 - 20:00',
      time: '19:00',
      selected: false,
    },
  ];

  infoEnvioDisponiblididadActual: infoDisponibilidadGeneral;

  nombreEmpresa = ''

  showAlerta: boolean = false;
  confirmMessage: string = '';

  semanaConCoincidencia: boolean = false;
  mostrarModaldisponibilidad: boolean = false;

  constructor(
    private gestionarDisponibilidadService: GestionarDisponibilidadService,
    private layoutService: LayoutService) { }

  ngOnInit() {

    this.diaInicial = this.getMonday(new Date());
    this.diaInicial.setDate(this.diaInicial.getDate() - 1);

    this.asignarNuevaFecha(this.diaInicial);
    this.semana[0].fullDate.getDate() - 6
    const fechaLocal = new Date(this.semana[0].fullDate.setDate(this.semana[0].fullDate.getDate() - 6));
    this.fechaFinalSemana = new Date(fechaLocal.setMonth(this.semana[0].fullDate.getMonth() + 3));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.nitEmpresaAnfitriona.firstChange) {

      this.diaInicial = this.getMonday(new Date());
      this.diaInicial.setDate(this.diaInicial.getDate() - 1);

      this.asignarNuevaFecha(this.diaInicial);
      this.semana[0].fullDate.getDate() - 6
      const fechaLocal = new Date(this.semana[0].fullDate.setDate(this.semana[0].fullDate.getDate() - 6));
      this.fechaFinalSemana = new Date(fechaLocal.setMonth(this.semana[0].fullDate.getMonth() + 3));
      this.fechaCalendario.emit({
        fecha: "",
        horaInicio: "",
        horaFin: ""
      });
    }
  }

  closeAlert() {
    this.showAlerta = false;
    this.closePopupCancelar();
  }

  convertirMes(mes: number): string {
    return this.listadoMeses.find(m => m.id === mes).name;
  }

  asignarNuevaFecha1(fecha: Date) {
    if (!this.nitEmpresaInvitada) {
      this.isCalendario = false;
      return;
    }

    this.ano = fecha.getFullYear();
    this.mes = this.convertirMes(fecha.getMonth());

    this.semana.map((dia, index) => {
      const newFecha = new Date(fecha)
      const fechaSumada = new Date(newFecha.setDate(newFecha.getDate() + index));
      dia.dia = fechaSumada.getDate();
      dia.mes = fechaSumada.getMonth();
      dia.ano = fechaSumada.getFullYear();
      dia.fullDate = fecha
    });

    const payload = {
      nit: this.nitEmpresaAnfitriona,
      startDate: fecha.toISOString(),
      endDate: new Date(fecha.setDate(fecha.getDate() + 6)).toISOString()
    }

    this.layoutService.showLoading();

    this.gestionarDisponibilidadService.getDisponibilidadEspecifica(payload).subscribe(
      ({ data }) => {
        this.infoEnvioDisponiblididadActual = { ...this.infoEnvioDisponiblididadActual, ...data };

        this.mounth.currentWeek.map(day => {
          day.selected = data[day.key].SelectedDay;
          day.times.map(time => {
            time.selected = data[day.key][time.selectKey];
            time.visible = data[day.key][time.visibleKey];
          });
        });

        this.diaInicial = new Date(payload.startDate);

        this.layoutService.closeLoading();
        this.layoutService.showLoading();

        this.gestionarDisponibilidadService.getHorariosDisponibles(this.nitEmpresaAnfitriona).subscribe(({ data }) => {

          this.mounth.currentWeek.map(day => {
            day.times.map(time => {
              time.visible = data[day.key][time.visibleKey];
            });
          });

          this.isCalendario = true;
          this.layoutService.closeLoading();

        }, error => {
          this.layoutService.closeLoading();
        });

        this.nombreEmpresa = this.infoEnvioDisponiblididadActual.CompanyName;

      }, error => {
        this.layoutService.closeLoading();
      });

    this.fechaActualSemana = new Date(this.semana[0].fullDate.setDate(this.semana[0].fullDate.getDate() - 6));
  }

  /************************************************************************************* */
  asignarNuevaFecha(fecha: Date) {
    this.semanaConCoincidencia = false;

    const baseDate = new Date(fecha)

    if (!this.nitEmpresaInvitada || !this.nitEmpresaAnfitriona) {
      this.isCalendario = false;
      return;
    }

    this.ano = fecha.getFullYear();
    this.mes = this.convertirMes(fecha.getMonth());

    this.semana.map((dia, index) => {
      const newFecha = new Date(fecha)
      const fechaSumada = new Date(newFecha.setDate(newFecha.getDate() + index));
      dia.dia = fechaSumada.getDate();
      dia.mes = fechaSumada.getMonth();
      dia.ano = fechaSumada.getFullYear();
      dia.fullDate = fecha
    });

    let payload = {
      nit: this.nitEmpresaAnfitriona,
      startDate: fecha.toISOString(),
      endDate: new Date(fecha.setDate(fecha.getDate() + 6)).toISOString()
    }
    let dataAnfitriona: any;
    let dataInvitada: any;

    this.layoutService.showLoading();

    // obtiene la disponibilidad de la empresa anfitriona por nit en una semana
    this.gestionarDisponibilidadService.getDisponibilidadEspecifica(payload).subscribe(
      ({ data }) => {
        if (!data) {
          this.layoutService.closeLoading();
          this.existeDisponibilidad.emit(false);
          return;
        }
        dataAnfitriona = data;

        payload.nit = this.nitEmpresaInvitada;
        // obtiene la disponibilidad de la empresa invitada por nit en una semana
        this.gestionarDisponibilidadService.getDisponibilidadEspecifica(payload).subscribe(
          (res) => {
            if (!res.data) {
              this.layoutService.closeLoading();
              this.existeDisponibilidad.emit(false);
              return;
            }
            dataInvitada = res.data;
            this.mounth.currentWeek.map(day => {
              day.selected = (dataAnfitriona[day.key].SelectedDay && dataInvitada[day.key].SelectedDay);
              day.times.map(time => {
                time.selected = (dataAnfitriona[day.key][time.selectKey] && dataInvitada[day.key][time.selectKey]);
                time.visible = (dataAnfitriona[day.key][time.visibleKey] && dataInvitada[day.key][time.visibleKey]);
                if (time.selected && time.visible && day.selected) {
                  this.semanaConCoincidencia = true;
                }
              });
            });

            this.diaInicial = new Date(payload.startDate);

            let horasDisponiblesAnfitriona: any;
            let horasDisponiblesInvitada: any;
            // obtiene la disponibilidad de la empresa anfitriona por nit
            this.gestionarDisponibilidadService.getHorariosDisponibles(this.nitEmpresaAnfitriona).subscribe(({ data }) => {
              horasDisponiblesAnfitriona = data;
              // obtiene la disponibilidad de la empresa invitada por nit
              this.gestionarDisponibilidadService.getHorariosDisponibles(this.nitEmpresaInvitada).subscribe(({ data }) => {
                horasDisponiblesInvitada = data;

                this.mounth.currentWeek.map(day => {
                  day.times.map(time => {
                    time.visible = (horasDisponiblesAnfitriona[day.key][time.visibleKey] && horasDisponiblesInvitada[day.key][time.visibleKey]);
                  });
                });

                this.isCalendario = true;
                this.layoutService.closeLoading();

              }, error => {
                this.layoutService.closeLoading();
              });

            }, error => {
              this.layoutService.closeLoading();
            });

          }, error => {
            this.layoutService.closeLoading();
          });
      }, error => {
        this.layoutService.closeLoading();
      });

    // obtener citas invitado
    this.gestionarDisponibilidadService.getCitasAsignadas({ nit: this.nitEmpresaInvitada }).subscribe(({ data }) => {

      const citas = data.filter(c => c.idState >= 5 && c.idState <= 8);

      const newFecha = new Date(baseDate)

      this.mounth.currentWeek.map((day, i) => {
        const date = new Date(newFecha)
        let newDate = new Date(date.setDate(date.getDate() + i)).toISOString()

        citas.map(c => {
          if (c.appointmentDate.split('T')[0] === newDate.split('T')[0]) {
            day.times.map(time => {
              if (`${time.time}:00` === c.startHour) time.assigned = true
            })
          }
        })

      });

    }, error => {
      this.layoutService.closeLoading();
    });


    this.fechaActualSemana = new Date(this.semana[0].fullDate.setDate(this.semana[0].fullDate.getDate() - 6));
  }
  /************************************************************************************* */


  isFechaMayorActual(time: any, semana: any): boolean {
    const fecha = new Date(semana.fullDate.setMonth(semana.mes))
    const fecha1 = new Date(fecha.setDate(semana.dia));
    let timeText = time.text.split(" - ");
    let hora = timeText[0].split(":")[0];
    const fecha2 = new Date(fecha1.setHours(hora));
    return (fecha2 >= new Date())
  }

  updateTime(time: any, semana: any): void {
    const fecha = new Date(semana.fullDate.setMonth(semana.mes))
    const fecha1 = new Date(fecha.setDate(semana.dia));
    let timeText = time.text.split(" - ");
    let hora = timeText[0].split(":")[0];

    const fecha2 = new Date(fecha1.setHours(hora));
    if (fecha2 <= new Date()) return;
    this.fechaSeleccionada = fecha2.toISOString();

    this.horaSeleccionada = time.text;

    this.fechaCalendario.emit({
      fecha: this.fechaSeleccionada,
      horaInicio: timeText[0],
      horaFin: timeText[1]
    });
  }

  isFechaSelecciona(time: any, semana: any): boolean {
    const fecha = new Date(semana.fullDate.setMonth(semana.mes))
    const fecha1 = new Date(fecha.setDate(semana.dia))
    let timeText = time.text.split(" - ");
    let hora = timeText[0].split(":")[0];

    const fecha2 = new Date(fecha1.setHours(hora));
    const fechaSeleccionada = fecha2.toISOString();;

    const horaSeleccionada = time.text

    return (this.fechaSeleccionada === fechaSeleccionada && this.horaSeleccionada === horaSeleccionada);
  }

  getMonday(date: Date) {
    let day = date.getDay() || 7;
    if (day !== 1) date.setHours(-24 * (day - 1));

    return date;
  }

  horaMedia(times: any): number {
    const horasVisibles = times.filter((time: any) => time.visible);
    return Math.round(horasVisibles.length / 2);
  }

  aplicarHorarioEspecifico() {

    let count = 0;
    this.mounth.currentWeek.map((day, index) => {
      let payload = {
        "Id": 0,
        "NumberId": this.infoEnvioDisponiblididadActual.NumberId,
        "CompanyName": this.infoEnvioDisponiblididadActual.CompanyName,
        "Email": this.infoEnvioDisponiblididadActual.Email,
        "EspecificDate": "",
        "IncludeExclude": true,
        "Status": 0,
        "DateCreate": "2022-06-10T02:53:17.241Z",
        "IdUserCreate": 0,
        "DateUpdate": "2022-06-10T02:53:17.242Z",
        "IdUserUpdate": 0,
        "EspecificDay": {
          "Id": 0,
          "IdAvailableHoursCompanyEspecific": 0,
          "WeekDay": "Lunes",
          "S_05_06": false,
          "V_05_06": false,
          "S_06_07": false,
          "V_06_07": false,
          "S_07_08": false,
          "V_07_08": false,
          "S_08_09": false,
          "V_08_09": true,
          "S_09_10": false,
          "V_09_10": true,
          "S_10_11": false,
          "V_10_11": true,
          "S_11_12": false,
          "V_11_12": true,
          "S_12_13": false,
          "V_12_13": false,
          "S_13_14": false,
          "V_13_14": false,
          "S_14_15": false,
          "V_14_15": true,
          "S_15_16": false,
          "V_15_16": true,
          "S_16_17": false,
          "V_16_17": true,
          "S_17_18": false,
          "V_17_18": false,
          "S_18_19": false,
          "V_18_19": false,
          "S_19_20": false,
          "V_19_20": false
        }
      };

      let diaEspecifico = new Date(this.semana[0].fullDate)

      payload.EspecificDate = new Date(diaEspecifico.setDate(diaEspecifico.getDate() - (6 - index))).toISOString()

      day.times.map(d => {
        payload.EspecificDay.WeekDay = day.name;
        payload.EspecificDay[d.selectKey] = d.selected;
        payload.EspecificDay[d.visibleKey] = d.visible;
      });

      this.gestionarDisponibilidadService.updateHorariosEspecificos(payload).subscribe((data) => {

        count += 1;

        if (count === this.mounth.currentWeek.length) {
          this.showAlerta = true;
          this.confirmMessage = 'Has ingresado tu disponibilidad exitosamente.';
        }

      });

    });

  }

  funFlechaMesInicio() {
    if ((this.fechaActualSemana.getFullYear() == this.fechaActual.getFullYear())
      && (this.fechaActualSemana.getMonth() > this.fechaActual.getMonth())) {
      return true;
    }
    return false;
  }
  funFlechaMesFin() {
    if ((this.fechaActualSemana.getFullYear() == this.fechaActual.getFullYear())
      && (this.fechaActualSemana.getMonth() < this.fechaActual.getMonth() + 3)) {
      return true;
    }
    return false;
  }

  closePopupCancelar() {
    this.close.emit(false);
  }

  nextWeek() {
    const newFecha = new Date(this.diaInicial.setDate(this.diaInicial.getDate() + 7))
    this.asignarNuevaFecha(newFecha);
  }

  prevWeek() {
    const newFecha = new Date(this.diaInicial.setDate(this.diaInicial.getDate() - 7))
    this.asignarNuevaFecha(newFecha);
  }

  nombreDelDiaSegunFecha = (fecha: Date) => [1, 2, 3, 4, 5, 6, 7][new Date(fecha).getDay()];

  nextMounth(): void {
    const newDate = new Date(this.diaInicial);
    const nextMounth = new Date(newDate.setMonth(newDate.getMonth() + 1));
    this.asignarNuevaFecha(this.getWeek(nextMounth));
  }

  prevMounth(): void {
    const newDate = new Date(this.diaInicial);
    const mounth = new Date(newDate.setMonth(newDate.getMonth()));
    this.asignarNuevaFecha(this.getWeek(mounth));
  }

  getWeek(fecha: Date): Date {
    const startOfTheMonth = new Date(fecha.setDate(1))
    const diaSemana = this.nombreDelDiaSegunFecha(startOfTheMonth);

    let startOfTheWeek = startOfTheMonth;

    if (diaSemana > 1) {
      startOfTheWeek = new Date(startOfTheMonth.setDate(startOfTheMonth.getDate() - (diaSemana - 1)));
    }
    return startOfTheWeek;
  }
}

