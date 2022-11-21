import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TableroService } from 'src/app/_services/gestion-secretarias/tablero.service';

// Utils
import { Validaciones } from 'src/app/_shared/utils/validaciones';

@Component({
  selector: 'app-tablero-form',
  templateUrl: './tablero-form.component.html',
  styleUrls: [
    './tablero-form.component.scss',
    './../../../../_shared/styles/modals.scss'
  ]
})
export class TableroFormComponent implements OnInit {
  @ViewChild('nombre', { static: false }) nombre: ElementRef;
  @ViewChild('link', { static: false }) link: ElementRef;
  activeValidator: boolean = false;
  
  sendedData;
  id = 0;
  form: FormGroup;

  formProperties = {
    nombre: {
      maxCaracteres: 100,
      validationMessages: {
        required: 'El nombre es requerido',
      },
      error: false,
    },
    link: {
      maxCaracteres: 200,
      validationMessages: {
        required: 'El link es requerido',
      },
      error: false,
    },
  };

  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private tableroService: TableroService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getContent();
  }

  getContent() {
    if(this.id > 0) {
      this.tableroService.getBoardDetail(this.id)
      .subscribe(response => {
        this.form.patchValue(response[0]);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: 0,
      nombre: [ '',
        [
          Validators.required,
          Validators.maxLength(this.formProperties.nombre.maxCaracteres),
        ],
      ],
      link: [ '',
        [
          Validators.required,
          Validators.maxLength(this.formProperties.link.maxCaracteres),
        ],
      ]
    });
  }
  
  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const tablero = this.form.value;
      if(this.id === 0) {
        this.tableroService.createBoard(tablero)
        .subscribe((response) => {
          this.modal.close(response);
        });
      }
      else {
        this.tableroService.updateBoard(tablero)
        .subscribe((response) => {
          this.modal.close(response);
        });
      }
    } else {
      (this.form.get("nombre").valid) ? "" : this.nombre.nativeElement.placeholder = 'Por favor ingrese información en este campo';
      (this.form.get("link").valid) ? "" : this.link.nativeElement.placeholder = 'Por favor ingrese información en este campo';
      this.activeValidator = true;
    }
  }

  validarCampo(propiedad) {
    return this.form.get(propiedad).invalid && this.activeValidator;
  }

  patternValidation(event) {
    if (event.key != undefined) {
      var phoneRGEX = /^[A-Za-z0-9\s.:;,áéíóú]+$/g;
      return (phoneRGEX.test(event.key)) ? true : false;
    } else {
      return false;
    }
  }
}