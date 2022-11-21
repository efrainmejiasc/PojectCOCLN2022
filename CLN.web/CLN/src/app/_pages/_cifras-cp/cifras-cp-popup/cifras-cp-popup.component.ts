import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

export interface Products {
  code: number;
  value: number;
  quantity: number;
}

const ELEMENT_DATA: Products[] = [
  {code: 10000, value: 1.0079, quantity: 1},
  {code: 11000, value: 4.0026, quantity: 2},
  {code: 12000, value: 6.941, quantity: 10},
  {code: 13000, value: 9.0122, quantity: 5},
  {code: 14000, value: 10.811, quantity: 6},
  {code: 15000, value: 12.0107, quantity: 4},
  {code: 16000, value: 14.0067, quantity: 21},
  {code: 17000, value: 15.9994, quantity: 23},
  {code: 18000, value: 18.9984, quantity: 2},
  {code: 19000, value: 20.1797, quantity: 5},
];

@Component({
  selector: 'app-cifras-cp-popup',
  templateUrl: './cifras-cp-popup.component.html',
  styleUrls: ['./cifras-cp-popup.component.scss']
})
export class CifrasCpPopupComponent implements OnInit {
  displayedColumns: string[] = ['code', 'value', 'quantity'];
  dataSource = ELEMENT_DATA;

  constructor(
    public dialogRef: MatDialogRef<CifrasCpPopupComponent>,
  ) { }

  ngOnInit() {
  }

}
