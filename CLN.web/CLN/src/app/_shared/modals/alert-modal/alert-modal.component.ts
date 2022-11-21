import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: [
    './alert-modal.component.scss',
    '../../styles/modals.scss'
  ]
})
export class AlertModalComponent implements OnInit {

  message: string;

  constructor(
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
  }
}
