import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/_pages/_ofertas/components/detalles/detalles.component';
import { currencyFormat } from 'src/utils/currencyFormat';

@Component({
  selector: 'app-detalle-proceso',
  templateUrl: './detalle-proceso.component.html',
  styleUrls: ['./detalle-proceso.component.scss']
})
export class DetalleProcesoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetalleProcesoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.data.basePrice = currencyFormat(this.data.basePrice);

   }

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

  openUrl() {
    if (this.data.processUrl) {
        window.open(this.data.processUrl, "_blank");  
    }    
  }

}
