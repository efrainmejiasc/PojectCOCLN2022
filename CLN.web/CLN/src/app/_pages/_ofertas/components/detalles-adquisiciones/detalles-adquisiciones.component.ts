import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../detalles/detalles.component';

@Component({
  selector: 'app-detalles-adquisiciones',
  templateUrl: './detalles-adquisiciones.component.html',
  styleUrls: ['./detalles-adquisiciones.component.scss']
})
export class DetallesAdquisicionesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetallesAdquisicionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
  }

  formatearPrecio(valor: string) {
    const newValor = parseInt(valor);
    const formato = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(newValor);
    return formato.split(' ')[0];
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
