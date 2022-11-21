import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  processNumber: string;
  phase: string;
  dateLoadSecop: string;
  lastPublicationDate: string;
  basePrice: string;
  contractingModality: string;
  dateReceiptResponses: string;
  duration: string;
  unitDuration: string;
  city: string;
  mainCategoryCode: string;
  additionalCategories: string;
  urlProcess: string;
  detailObjectToHired: string;
}

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetallesComponent>,
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

  openUrl() {
    if (this.data.urlProcess) {
        window.open(this.data.urlProcess, "_blank");  
    }    
  }

}
