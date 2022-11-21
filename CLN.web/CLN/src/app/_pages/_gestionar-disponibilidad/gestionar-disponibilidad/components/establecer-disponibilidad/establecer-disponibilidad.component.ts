import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { GestionarDisponibilidadService } from '../../../../../_services/_gestionar-disponibilidad/gestionar-disponibilidad.service';


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
  selector: 'app-establecer-disponibilidad',
  templateUrl: './establecer-disponibilidad.component.html',
  styleUrls: ['./establecer-disponibilidad.component.scss']
})
export class EstablecerDisponibilidadComponent implements OnInit {

  @Input() empresaSeleccionada: number = 0;
  @Output() validarCambios = new EventEmitter<any>();
  
  hours = [
    {
      id: 1,
      text: '05:00 - 06:00',
      time : '05:00',
      selected: false,
      disabled: false
    },
    {
      id: 2,
      text: '06:00 - 07:00',
      time : '06:00',
      selected: false,
      disabled: false
    },
    {
      id: 3,
      text: '07:00 - 08:00',
      time : '07:00',
      selected: false,
      disabled: false
    },
    {
      id: 4,
      text: '08:00 - 09:00',
      time : '08:00',
      selected: false,
      disabled: false
    },
    {
      id: 5,
      text: '09:00 - 10:00',
      time : '09:00',
      selected: false,
      disabled: false
    },
    {
      id: 6,
      text: '10:00 - 11:00',
      time : '10:00',
      selected: false,
      disabled: false
    },
    {
      id: 7,
      text: '11:00 - 12:00',
      time : '11:00',
      selected: false,
      disabled: false
    },
    {
      id: 8,
      text: '12:00 - 13:00',
      time : '12:00',
      selected: false,
      disabled: false
    },
    {
      id: 9,
      text: '13:00 - 14:00',
      time : '13:00',
      selected: false,
      disabled: false
    },
    {
      id: 10,
      text: '14:00 - 15:00',
      time : '14:00',
      selected: false,
      disabled: false
    },
    {
      id: 11,
      text: '15:00 - 16:00',
      time : '15:00',
      selected: false,
      disabled: false
    },
    {
      id: 12,
      text: '16:00 - 17:00',
      time : '16:00',
      selected: false,
      disabled: false
    },
    {
      id: 13,
      text: '17:00 - 18:00',
      time : '17:00',
      selected: false,
      disabled: false
    },
    {
      id: 14,
      text: '18:00 - 19:00',
      time : '18:00',
      selected: false,
      disabled: false
    },
    {
      id: 15,
      text: '19:00 - 20:00',
      time : '19:00',
      selected: false,
      disabled: false
    },
  ];

  selectedHours = []
  wrapperActive = false;

  mounth = {
    id: '',
    name: '',
    currentWeek: [
      {
        id: 1,
        name: 'Domingo',
        visualName: 'Domingo',
        key: 'Sunday',
        date: new Date(),
        selected: false,
        disabled: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06'
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07'
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08'
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09'
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10'
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11'
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12'
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13'
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14'
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15'
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16'
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17'
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18'
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19'
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20'
          },
        ]
      },
      {
        id: 2,
        name: 'Lunes',
        visualName: 'Lunes',
        key: 'Monday',
        date: new Date(),
        selected: false,
        disabled: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06'
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07'
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08'
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09'
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10'
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11'
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12'
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13'
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14'
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15'
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16'
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17'
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18'
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19'
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20'
          },
        ]
      },
      {
        id: 3,
        name: 'Martes',
        visualName: 'Martes',
        key: 'Tuesday',
        date: new Date(),
        selected: false,
        disabled: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06'
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07'
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08'
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09'
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10'
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11'
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12'
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13'
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14'
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15'
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16'
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17'
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18'
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19'
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20'
          },
        ]
      },
      {
        id: 4,
        name: 'Miercoles',
        visualName: 'Miércoles',
        key: 'Wednesday',
        date: new Date(),
        selected: false,
        disabled: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06'
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07'
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08'
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09'
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10'
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11'
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12'
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13'
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14'
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15'
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16'
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17'
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18'
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19'
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20'
          },
        ]
      },
      {
        id: 5,
        name: 'Jueves',
        visualName: 'Jueves',
        key: 'Thursday',
        date: new Date(),
        selected: false,
        disabled: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06'
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07'
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08'
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09'
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10'
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11'
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12'
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13'
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14'
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15'
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16'
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17'
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18'
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19'
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20'
          },
        ]
      },
      {
        id: 6,
        name: 'Viernes',
        visualName: 'Viernes',
        key: 'Friday',
        date: new Date(),
        selected: false,
        disabled: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06'
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07'
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08'
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09'
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10'
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11'
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12'
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13'
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14'
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15'
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16'
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17'
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18'
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19'
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20'
          },
        ]
      },
      {
        id: 7,
        name: 'Sabado',
        visualName: 'Sábado',
        key: 'Saturday',
        date: new Date(),
        selected: false,
        disabled: false,
        times: [
          {
            id: 1,
            text: '05:00 - 06:00',
            time : '05:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_05_06',
            visibleKey: 'V_05_06'
          },
          {
            id: 2,
            text: '06:00 - 07:00',
            time : '06:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_06_07',
            visibleKey: 'V_06_07'
          },
          {
            id: 3,
            text: '07:00 - 08:00',
            time : '07:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_07_08',
            visibleKey: 'V_07_08'
          },
          {
            id: 4,
            text: '08:00 - 09:00',
            time : '08:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_08_09',
            visibleKey: 'V_08_09'
          },
          {
            id: 5,
            text: '09:00 - 10:00',
            time : '09:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_09_10',
            visibleKey: 'V_09_10'
          },
          {
            id: 6,
            text: '10:00 - 11:00',
            time : '10:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_10_11',
            visibleKey: 'V_10_11'
          },
          {
            id: 7,
            text: '11:00 - 12:00',
            time : '11:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_11_12',
            visibleKey: 'V_11_12'
          },
          {
            id: 8,
            text: '12:00 - 13:00',
            time : '12:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_12_13',
            visibleKey: 'V_12_13'
          },
          {
            id: 9,
            text: '13:00 - 14:00',
            time : '13:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_13_14',
            visibleKey: 'V_13_14'
          },
          {
            id: 10,
            text: '14:00 - 15:00',
            time : '14:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_14_15',
            visibleKey: 'V_14_15'
          },
          {
            id: 11,
            text: '15:00 - 16:00',
            time : '15:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_15_16',
            visibleKey: 'V_15_16'
          },
          {
            id: 12,
            text: '16:00 - 17:00',
            time : '16:00',
            visible: true,
            selected: false,
            disabled: false,
            selectKey: 'S_16_17',
            visibleKey: 'V_16_17'
          },
          {
            id: 13,
            text: '17:00 - 18:00',
            time : '17:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_17_18',
            visibleKey: 'V_17_18'
          },
          {
            id: 14,
            text: '18:00 - 19:00',
            time : '18:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_18_19',
            visibleKey: 'V_18_19'
          },
          {
            id: 15,
            text: '19:00 - 20:00',
            time : '19:00',
            visible: false,
            selected: false,
            disabled: false,
            selectKey: 'S_19_20',
            visibleKey: 'V_19_20'
          },
        ]
      },
    ],
  }

  showAlertInfo: boolean = false;
  mostrarModalFecha: boolean = false;
  mostrarModaldisponibilidad: boolean = false;

  infoEmpresa: any = {
    companyIdentifier: null
  };
  infoEnvioDisponiblididadActual: infoDisponibilidadGeneral;
  confirmMessage: string;
  showAlerta: boolean = false;
  showInfo: boolean = false;
  sectorEmpresa: string = '';
  initialObject = {};
  hayCambios = false;
  citasAsignadas: any[];
  diaInicial = new Date();

  constructor(
    private gestionarDisponibilidadService: GestionarDisponibilidadService,
    private layoutService:LayoutService) { }

  ngOnInit() {
    
    this.infoEmpresa = this.empresaSeleccionada[0];      

    if( !this.infoEmpresa.companyIdentifier ) return;

    this.sectorEmpresa = this.empresaSeleccionada[0].industries.value;
    
    this.obtenerHorario(this.infoEmpresa.companyIdentifier);

    this.empresaSeleccionada && this.gestionarDisponibilidadService.getCitasAsignadas({nit: this.infoEmpresa.companyIdentifier}).subscribe(({ data }) => {
      
      this.citasAsignadas = data;

      this.diaInicial = this.getMonday(new Date());
      this.diaInicial.setDate(this.diaInicial.getDate() - 1);
  
      this.mounth.currentWeek.map( ( day, index ) => {
        day.date = new Date(new Date(this.diaInicial).setDate(this.diaInicial.getDate() + index))
      });
  
      this.mounth.currentWeek.map( ( day, index ) => {

        this.citasAsignadas.map( e => {

          if( new Date(e.appointmentDate.split('T')[0]) > new Date() ){

            if( day.name === e.weekDay ){
  
              // day.disabled = true;

              day.times.map( time => {
                if( `${time.time}:00` === e.startHour ) {
                  // time.disabled = true;
                  this.hours.map( hour => {
                    if(hour.time === `${time.time}`) {
                      if(hour.time === `${time.time}`) {

                        if( e.idState >=5 && e.idState <= 8 ){
                          hour.disabled = true;
                          time.disabled = true;
                          day.disabled = true;
                        }
                      }
                    }
                  });
                }

              })
            }

          }

        })
        
  
      })
      

    }, error => {
      this.layoutService.closeLoading();
    });

    this.empresaSeleccionada && this.gestionarDisponibilidadService.getCitasAsignadasHost({nit: this.infoEmpresa.companyIdentifier}).subscribe(({ data }) => {

      this.citasAsignadas = data;

      this.diaInicial = this.getMonday(new Date());
      this.diaInicial.setDate(this.diaInicial.getDate() - 1);
  
      this.mounth.currentWeek.map( ( day, index ) => {
        day.date = new Date(new Date(this.diaInicial).setDate(this.diaInicial.getDate() + index))
      });
  
      this.mounth.currentWeek.map( ( day, index ) => {

        this.citasAsignadas.map( e => {

          if( new Date(e.appointmentDate.split('T')[0]) > new Date() ){

            if( day.name === e.weekDay ){

              day.times.map( time => {

                if( `${time.time}:00` === e.startHour ) {
                  
                  this.hours.map( hour => {
                    if(hour.time === `${time.time}`) {

                      if( e.idState >=5 && e.idState <= 8 ){
                        hour.disabled = true;
                        time.disabled = true;
                        day.disabled = true;
                      }
                    }
                  });
                }

              })
            }

          }

        })
        
  
      })
      

    }, error => {
      this.layoutService.closeLoading();
    });
    
    return;
    this.layoutService.showLoading();
    this.empresaSeleccionada && this.gestionarDisponibilidadService.getInfoEmpresa(this.empresaSeleccionada).subscribe(({ data }) => {

      this.infoEmpresa = data;      
      this.sectorEmpresa = data.industryMainSector[0].value;
      this.layoutService.closeLoading();
      
      
      this.obtenerHorario(this.infoEmpresa.numberId);

      this.empresaSeleccionada && this.gestionarDisponibilidadService.getCitasAsignadas({nit: this.infoEmpresa.numberId}).subscribe(({ data }) => {

        console.log(data);
        
        this.citasAsignadas = data;

        this.diaInicial = this.getMonday(new Date());
        this.diaInicial.setDate(this.diaInicial.getDate() - 1);
    
        this.mounth.currentWeek.map( ( day, index ) => {
          day.date = new Date(new Date(this.diaInicial).setDate(this.diaInicial.getDate() + index))
        });
    
        this.mounth.currentWeek.map( ( day, index ) => {

          this.citasAsignadas.map( e => {

            if( new Date(e.appointmentDate.split('T')[0]) > new Date() ){

              if( day.name === e.weekDay ){
                day.disabled = true;

                day.times.map( time => {
  
                  if( `${time.time}:00` === e.startHour ) {
                    time.disabled = true;
                    this.hours.map( hour => {
                      if(hour.time === `${time.time}`) hour.disabled = true;
                    });
                  }

                })
              }

            }

          })
          
    
        })
        
  
      }, error => {
        this.layoutService.closeLoading();
      });

      this.empresaSeleccionada && this.gestionarDisponibilidadService.getCitasAsignadasHost({nit: this.infoEmpresa.numberId}).subscribe(({ data }) => {

        this.citasAsignadas = data;

        this.diaInicial = this.getMonday(new Date());
        this.diaInicial.setDate(this.diaInicial.getDate() - 1);
    
        this.mounth.currentWeek.map( ( day, index ) => {
          day.date = new Date(new Date(this.diaInicial).setDate(this.diaInicial.getDate() + index))
        });
    
        this.mounth.currentWeek.map( ( day, index ) => {

          this.citasAsignadas.map( e => {

            if( new Date(e.appointmentDate.split('T')[0]) > new Date() ){

              if( day.name === e.weekDay ){
                day.disabled = true;

                day.times.map( time => {
  
                  if( `${time.time}:00` === e.startHour ) {
                    time.disabled = true;
                    this.hours.map( hour => {
                      if(hour.time === `${time.time}`) hour.disabled = true;
                    });
                  }

                })
              }

            }

          })
          
    
        })
        
  
      }, error => {
        this.layoutService.closeLoading();
      });

    }, error => {
      this.layoutService.closeLoading();
    });
    
    
    
  }

  getMonday( date: Date ) {
    let day = date.getDay() || 7;  
    if( day !== 1 )  date.setHours(-24 * (day - 1)); 

    return date;
  }

  selectDay(){
    
  }

  publicar(): void
  {

  }

  mostrarOcultarCalendario(): void
  {
    if(!this.hayCambios) this.mostrarModalFecha = !this.mostrarModalFecha;
  }

  mostrarOcultarDisponibilidad(): void
  {
    this.mostrarModaldisponibilidad = !this.mostrarModaldisponibilidad;
  }

  closePopupCambios( valor: boolean ): void
  {
    this.mostrarModalFecha = !this.mostrarModalFecha;
  }

  closePopupDisponibilidad( valor: boolean ): void
  {
    this.mostrarModaldisponibilidad = !this.mostrarModaldisponibilidad;
  }

  horaMedia( times: any ): number
  { 
    const horasVisibles = times.filter( ( time: any ) => time.visible );
    return Math.round( horasVisibles.length / 2 );
  }

  updateDay( day: any ): void
  {
    day.selected = !day.selected;
    !day.selected && day.times.map( (time: any) => {
      time.selected = false;
    });

    this.actualizarEstadoSemana();
    this.hayCambios = JSON.stringify(this.initialObject) != JSON.stringify(this.infoEnvioDisponiblididadActual);
    
    this.validarCambios.emit(this.hayCambios);
  }

  updateTime( time: any ): void
  {
    time.selected = !time.selected;
    this.actualizarEstadoSemana();
    this.hayCambios = JSON.stringify(this.initialObject) != JSON.stringify(this.infoEnvioDisponiblididadActual);
    this.validarCambios.emit(this.hayCambios);
  }

  show(): void{
    this.wrapperActive = !this.wrapperActive;
  }

  addHour( id: number ): void
  {
    let selectedHour = this.hours.find( hour => hour.id === id);
    selectedHour.selected = !selectedHour.selected;

    this.mounth.currentWeek.map( day => {
      day.times.map( time => {
        const foundHour = time.id === id;
        if( foundHour ) {
          time.visible = selectedHour.selected;
          !time.visible ? time.selected = false : '';
        }
      });
    });

    this.actualizarEstadoSemana();
    this.hayCambios = JSON.stringify(this.initialObject) != JSON.stringify(this.infoEnvioDisponiblididadActual);
    this.validarCambios.emit(this.hayCambios);
  } 

  obtenerHorario(nitEmpresa: string){

    this.layoutService.showLoading();

    this.gestionarDisponibilidadService.getHorariosDisponibles( nitEmpresa ).subscribe(({ data }) => {

      this.initialObject = JSON.parse(JSON.stringify(data))

      this.infoEnvioDisponiblididadActual = { ...this.infoEnvioDisponiblididadActual, ...data };
      
      this.mounth.currentWeek.map( day => {
        day.selected = data[day.key].SelectedDay;
        day.times.map( time => {
          time.selected = data[day.key][time.selectKey];
          time.visible = data[day.key][time.visibleKey];
        });
      });

      this.mounth.currentWeek[0].times.map( (time, index) => {
        this.hours[index].selected = time.visible;
      });

      this.actualizarEstadoSemana();
      this.hayCambios = JSON.stringify(this.initialObject) != JSON.stringify(this.infoEnvioDisponiblididadActual);
      
      this.validarCambios.emit(this.hayCambios);

      this.layoutService.closeLoading();

    }, error => {
      this.layoutService.closeLoading();
    });

  }
  
  publicarHorarioDisponible(){

    this.actualizarEstadoSemana();

    this.layoutService.showLoading();

    this.gestionarDisponibilidadService.updateHorariosDisponibles(this.infoEnvioDisponiblididadActual).subscribe(( data ) => {

      this.layoutService.closeLoading();
      this.obtenerHorario(this.infoEnvioDisponiblididadActual.NumberId);

      this.confirmMessage = "La disponibilidad de tu empresa para asistir a citas de negocios virtuales ha sido publicada exitosamente. A partir de este momento, las empresas de Compra Lo Nuestro podrán verla y enviarte invitaciones"
      this.showAlerta = true;

    }, error => {
      this.layoutService.closeLoading();
    });


  }

  actualizarEstadoSemana(){

    this.mounth.currentWeek.forEach( day => {

      this.infoEnvioDisponiblididadActual[day.key].SelectedDay = day.selected;

      day.times.forEach( time => {

        this.infoEnvioDisponiblididadActual[day.key][time.selectKey] = day.selected ? time.selected : false;
        this.infoEnvioDisponiblididadActual[day.key][time.visibleKey] = time.visible;

      })
      
    });

  }

  closePopup(){
    this.showAlerta = false;
  }

  handleInfo(){
    this.showInfo = !this.showInfo;
  }

}
