import { Component, OnInit, Inject, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-contenidos-message',
  templateUrl: './contenidos-message.component.html',
  styleUrls: ['./contenidos-message.component.scss']
})
export class ContenidosMessageComponent implements OnInit {

  description: string;

  constructor(
    private dialogRef: MatDialogRef<ContenidosMessageComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.description = data.description;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
