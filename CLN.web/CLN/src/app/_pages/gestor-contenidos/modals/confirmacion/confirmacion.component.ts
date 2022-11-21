import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-confirmacion",
  templateUrl: "./confirmacion.component.html",
  styleUrls: [
    "./../../shared/styles/modals.scss",
    "./confirmacion.component.scss",
  ],
})
export class ConfirmacionComponent implements OnInit {
  message: string[] = [];
  buttons: Array<model> = [];
  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {}

  action(action) {
    this.modal.close(action);
  }
}

class model {
  class: string;
  messsage: string;
  action: string;
}
