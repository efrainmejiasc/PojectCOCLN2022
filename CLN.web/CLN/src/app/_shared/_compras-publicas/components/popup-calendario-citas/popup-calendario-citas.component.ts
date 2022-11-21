import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { GestionarDisponibilidadService } from 'src/app/_services/_gestionar-disponibilidad/gestionar-disponibilidad.service';
import { buildDate } from 'src/utils/buildDate';

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
  selector: 'app-popup-calendario-citas',
  templateUrl: './popup-calendario-citas.component.html',
  styleUrls: ['./popup-calendario-citas.component.scss']
})
export class PopupCalendarioCitasComponent implements OnInit {

  @Input() message: string;
  @Input() nitEmpresa: string;
  @Output() close = new EventEmitter<any>();

  showAlertInfo: boolean = false;
  diaInicial: Date;

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
      name: 'Miércoles',
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
      name: 'Sábado',
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
        date: new Date(),
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            disabled: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            disabled: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            disabled: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            disabled: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            disabled: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            disabled: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            disabled: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            disabled: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            disabled: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            disabled: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            disabled: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            disabled: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            disabled: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            disabled: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            disabled: false
          },
        ]
      },
      {
        id: 2,
        name: 'Lunes',
        key: 'Monday',
        date: new Date(),
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            disabled: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            disabled: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            disabled: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            disabled: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            disabled: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            disabled: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            disabled: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            disabled: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            disabled: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            disabled: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            disabled: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            disabled: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            disabled: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            disabled: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            disabled: false
          },
        ]
      },
      {
        id: 3,
        name: 'Martes',
        key: 'Tuesday',
        date: new Date(),
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            disabled: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            disabled: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            disabled: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            disabled: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            disabled: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            disabled: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            disabled: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            disabled: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            disabled: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            disabled: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            disabled: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            disabled: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            disabled: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            disabled: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            disabled: false
          },
        ]
      },
      {
        id: 4,
        name: 'Miercoles',
        key: 'Wednesday',
        date: new Date(),
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            disabled: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            disabled: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            disabled: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            disabled: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            disabled: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            disabled: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            disabled: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            disabled: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            disabled: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            disabled: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            disabled: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            disabled: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            disabled: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            disabled: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            disabled: false
          },
        ]
      },
      {
        id: 5,
        name: 'Jueves',
        key: 'Thursday',
        date: new Date(),
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            disabled: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            disabled: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            disabled: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            disabled: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            disabled: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            disabled: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            disabled: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            disabled: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            disabled: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            disabled: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            disabled: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            disabled: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            disabled: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            disabled: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            disabled: false
          },
        ]
      },
      {
        id: 6,
        name: 'Viernes',
        key: 'Friday',
        date: new Date(),
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            disabled: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            disabled: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            disabled: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            disabled: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            disabled: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            disabled: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            disabled: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            disabled: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            disabled: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            disabled: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            disabled: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            disabled: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            disabled: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            disabled: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            disabled: false
          },
        ]
      },
      {
        id: 7,
        name: 'Sabado',
        key: 'Saturday',
        date: new Date(),
        selected: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06',
            disabled: false
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07',
            disabled: false
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08',
            disabled: false
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09',
            disabled: false
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10',
            disabled: false
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11',
            disabled: false
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12',
            disabled: false
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13',
            disabled: false
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14',
            disabled: false
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15',
            disabled: false
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16',
            disabled: false
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17',
            disabled: false
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18',
            disabled: false
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19',
            disabled: false
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20',
            disabled: false
          },
        ]
      },
    ],
  };

  hours = [
    {
      id: 1,
      text: '05:00 - 06:00',
      time : '05:00',
      selected: false,
    },
    {
      id: 2,
      text: '06:00 - 07:00',
      time : '06:00',
      selected: false,
    },
    {
      id: 3,
      text: '07:00 - 08:00',
      time : '07:00',
      selected: false,
    },
    {
      id: 4,
      text: '08:00 - 09:00',
      time : '08:00',
      selected: false,
    },
    {
      id: 5,
      text: '09:00 - 10:00',
      time : '09:00',
      selected: false,
    },
    {
      id: 6,
      text: '10:00 - 11:00',
      time : '10:00',
      selected: false,
    },
    {
      id: 7,
      text: '11:00 - 12:00',
      time : '11:00',
      selected: false,
    },
    {
      id: 8,
      text: '12:00 - 13:00',
      time : '12:00',
      selected: false,
    },
    {
      id: 9,
      text: '13:00 - 14:00',
      time : '13:00',
      selected: false,
    },
    {
      id: 10,
      text: '14:00 - 15:00',
      time : '14:00',
      selected: false,
    },
    {
      id: 11,
      text: '15:00 - 16:00',
      time : '15:00',
      selected: false,
    },
    {
      id: 12,
      text: '16:00 - 17:00',
      time : '16:00',
      selected: false,
    },
    {
      id: 13,
      text: '17:00 - 18:00',
      time : '17:00',
      selected: false,
    },
    {
      id: 14,
      text: '18:00 - 19:00',
      time : '18:00',
      selected: false,
    },
    {
      id: 15,
      text: '19:00 - 20:00',
      time : '19:00',
      selected: false,
    },
  ];

  infoEnvioDisponiblididadActual: infoDisponibilidadGeneral;

  showAlerta: boolean = false;
  confirmMessage: string = '';

  diaSemanaActual = 0
  mesActual = 0;
  anoActual = 0;
  diaSemanaSemanaSeleccionanda = 0
  mesSeleccionado = 0;
  anoSeleccionado = 0;

  ocultarRegresarSemana = false;
  ocultarRegresarMes = false;

  citasAsignadas: [];

  constructor(
    private gestionarDisponibilidadService: GestionarDisponibilidadService,
    private layoutService:LayoutService) { }

  ngOnInit() {

    this.diaInicial = this.getMonday(new Date());
    this.diaInicial.setDate(this.diaInicial.getDate() - 1);
 
    this.diaSemanaActual = new Date(this.diaInicial).getDate();
    this.mesActual = new Date(this.diaInicial).getMonth();
    this.anoActual = new Date(this.diaInicial).getFullYear();
    
    this.asignarNuevaFecha(this.diaInicial);
  }

  closeAlert(){
    this.showAlerta = false;
    this.closePopupCancelar();
  }

  convertirMes( mes: number ): string
  {
    return this.listadoMeses.find( m => m.id === mes ).name;
  }

  asignarNuevaFecha(fecha: Date){

    this.ano = fecha.getFullYear();
    this.mes = this.convertirMes(fecha.getMonth());

    this.semana.map( ( dia, index ) => {
      const newFecha = new Date(fecha)
      const fechaSumada = new Date( newFecha.setDate(newFecha.getDate() + index) );
      dia.dia = fechaSumada.getDate();
      dia.mes = fechaSumada.getMonth();
      dia.ano = fechaSumada.getFullYear();
      dia.fullDate = fecha
    });

    const payload = {
      nit: this.nitEmpresa,
      startDate: fecha.toISOString(),
      endDate: new Date(fecha.setDate(fecha.getDate() + 6)).toISOString()
    }

    this.layoutService.showLoading();
    
    this.gestionarDisponibilidadService.getDisponibilidadEspecifica(payload).subscribe(( {data} ) => {

      this.infoEnvioDisponiblididadActual = { ...this.infoEnvioDisponiblididadActual, ...data };
      
      this.mounth.currentWeek.map( (day, index) => {
        day.selected = data[day.key].SelectedDay;
        day.date = new Date(new Date(payload.startDate).setDate(new Date(payload.startDate).getDate() + index))
        day.times.map( time => {
          time.selected = data[day.key][time.selectKey];
          time.visible = data[day.key][time.visibleKey];
        });
      });

      this.diaInicial = new Date(payload.startDate);

      this.layoutService.closeLoading();
      this.layoutService.showLoading();

      this.gestionarDisponibilidadService.getHorariosDisponibles(this.nitEmpresa).subscribe(( {data} ) => {
  
        this.mounth.currentWeek.map( day => {
          day.times.map( time => {
            time.visible = data[day.key][time.visibleKey];
          });
        });

        this.diaSemanaSemanaSeleccionanda = this.diaInicial.getDate();
        this.mesSeleccionado = this.diaInicial.getMonth();
        this.anoSeleccionado = this.diaInicial.getFullYear();

        this.ocultarRegresarSemana = this.diaSemanaActual+this.mesActual+this.anoActual!==this.diaSemanaSemanaSeleccionanda+this.mesSeleccionado+this.anoSeleccionado;
        this.ocultarRegresarMes = this.mesActual+this.anoActual!==this.mesSeleccionado+this.anoSeleccionado;

        this.layoutService.closeLoading();

      }, error => {
        this.layoutService.closeLoading();
      });

      this.mounth.currentWeek.map( day => {
        day.times.map(time => {
          time.disabled = false;
        }) 
      })

      this.gestionarDisponibilidadService.getCitasAsignadas({nit: payload.nit}).subscribe(({ data }) => {

        this.citasAsignadas = data;

        this.mounth.currentWeek.map( day => {
          const date = buildDate(day.date, true);
          
          const encontrado = data.filter( fecha => buildDate(new Date(fecha.appointmentDate), true) === date);

          if(encontrado){
            encontrado.map(e => {
              day.times.map(time => {
                if(`${time.time}:00` === e.startHour){
                  time.disabled = true;
                }else{
                  // time.disabled = false;
                }
              }) 
            })

          }else{
            day.times.map(time => {
              time.disabled = false;
            }) 
          }
          
        })
  
      }, error => {
        this.layoutService.closeLoading();
      });

      this.gestionarDisponibilidadService.getCitasAsignadasHost({nit: payload.nit}).subscribe(({ data }) => {

        this.citasAsignadas = data;
        console.log(data);
        

        this.mounth.currentWeek.map( day => {
          const date = buildDate(day.date, true);
          
          const encontrado = data.filter( fecha => buildDate(new Date(fecha.appointmentDate), true) === date);
      
          if(encontrado){
            
            encontrado.map( e => {
              day.times.map(time => {
                if(`${time.time}:00` === e.startHour){
                  time.disabled = true;
                }else{
                  // time.disabled = false;
                }
              }) 
            })
            
          }else{
            day.times.map(time => {
              time.disabled = false;
            }) 
          }
          
        })
  
      }, error => {
        this.layoutService.closeLoading();
      });
      
    }, error => {
      this.layoutService.closeLoading();
    });

  }

  updateTime( time: any ): void
  {
    time.selected = !time.selected;
  }

  getMonday( date: Date ) {
    let day = date.getDay() || 7;  
    if( day !== 1 )  date.setHours(-24 * (day - 1)); 

    return date;
  }

  horaMedia( times: any ): number
  { 
    const horasVisibles = times.filter( ( time: any ) => time.visible );
    return Math.round( horasVisibles.length / 2 );
  }

  aplicarHorarioEspecifico(){

    let count = 0;
    this.mounth.currentWeek.map( ( day, index ) => {
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

      let diaEspecifico = new Date( this.semana[0].fullDate )

      payload.EspecificDate = new Date(diaEspecifico.setDate(diaEspecifico.getDate() - (6 - index))).toISOString()

      day.times.map( d => {
        payload.EspecificDay.WeekDay = day.name;
        payload.EspecificDay[d.selectKey] = d.selected;
        payload.EspecificDay[d.visibleKey] = d.visible;
      });

      this.layoutService.showLoading();

      this.gestionarDisponibilidadService.updateHorariosEspecificos(payload).subscribe(( data ) => {
        
        count += 1;

        if( count === this.mounth.currentWeek.length ) {
          this.showAlerta = true;
          this.confirmMessage = 'Has ingresado tu disponibilidad exitosamente.';

          this.layoutService.closeLoading();
        }
        
      }, error => {
        this.layoutService.closeLoading();
      });
    
    });
    
  }

  closePopupCancelar(){
    this.close.emit(false);
  }

  nextWeek(){
    const newFecha = new Date(this.diaInicial.setDate(this.diaInicial.getDate() + 7))
    this.asignarNuevaFecha(newFecha);
  }

  lastWeek(){
    const newFecha = new Date(this.diaInicial.setDate(this.diaInicial.getDate() - 7))
    this.asignarNuevaFecha(newFecha);
  }

  nombreDelDiaSegunFecha = ( fecha: Date ) => [1, 2, 3, 4, 5, 6, 7][new Date(fecha).getDay()];

  nextMounth(): void
  {
    const newDate = new Date(this.diaInicial);
    const nextMounth = new Date( newDate.setMonth(newDate.getMonth() + 1) );
    this.asignarNuevaFecha(this.getWeek(nextMounth));
  }

  lastMounth(): void
  {
    const newDate = new Date(this.diaInicial);
    const lastMounth = new Date( newDate.setMonth(newDate.getMonth() - 1) );
    this.asignarNuevaFecha(this.getWeek(lastMounth) );
  }

  getWeek( fecha: Date ): Date
  {
    const startOfTheMonth = new Date( fecha.setDate(1) )
    const diaSemana = this.nombreDelDiaSegunFecha(startOfTheMonth);

    let startOfTheWeek = startOfTheMonth;
    
    if( diaSemana > 1 ){
      startOfTheWeek = new Date( startOfTheMonth.setDate(startOfTheMonth.getDate() - ( diaSemana - 1 ) ) );
    }

    return startOfTheWeek;

  }

}
