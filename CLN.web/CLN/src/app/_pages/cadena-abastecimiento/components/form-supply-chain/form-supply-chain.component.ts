import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from "@angular/forms";
import { GestionarDisponibilidadService } from "src/app/_services/_gestionar-disponibilidad/gestionar-disponibilidad.service";
import { SupplyChainService } from "src/app/_services/supplyChain/supply-chain.service";

@Component({
  selector: "app-form-supply-chain",
  templateUrl: "./form-supply-chain.component.html",
  styleUrls: ["./form-supply-chain.component.scss"],
})
export class FormSupplyChainComponent implements OnInit {
  invitingCompany: FormControl;
  public addressForm: FormGroup;
  companiesInvite = [];

  elementList = [
    {
      name: "Proveedores",
      id: 1,
      img: "assets/img/cadenaAbastecimiento/proveedores.png",
    },
    {
      name: "Fabricantes",
      id: 2,
      img: "assets/img/cadenaAbastecimiento/Fabricantes.png",
    },
    {
      name: "Transporte y logística",
      id: 3,
      img: "assets/img/cadenaAbastecimiento/Transporte.png",
    },
    {
      name: "Distribuidor",
      id: 4,
      img: "assets/img/cadenaAbastecimiento/Distribuidores.png",
    },
    {
      name: "Comerciante",
      id: 5,
      img: "assets/img/cadenaAbastecimiento/Comerciantes.png",
    },
    {
      name: "Consumidor",
      id: 6,
      img: "assets/img/cadenaAbastecimiento/Consumidor.png",
    },
  ];

  elementActive = 0;
  supplyElements: any;
  supplyElementTemplates: any;
  supplyChainbyCompanyAndUser: any;

  constructor(
    private fb: FormBuilder,
    private gestionarDisponibilidadService: GestionarDisponibilidadService,
    private supplyChainService: SupplyChainService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.invitingCompany = new FormControl("", Validators.required);
    this.getSupplyElements();
    this.getEmpresas();
    this.getSupplyElementTemplates();
    this.getSupplyChainbyCompanyAndUser();

    for (let i = 0; i < 12; i++) {
      this.addElementField();
    }
  }

  getEmpresas() {
    this.gestionarDisponibilidadService.getEmpresas().subscribe((response) => {
      this.companiesInvite = response.data;
    });
  }

  getSupplyElements() {
    this.supplyChainService.getSupplyElements().subscribe((response) => {
      this.supplyElements = response.data;
    });
  }

  getSupplyElementTemplates() {
    this.supplyChainService
      .getSupplyElementTemplates()
      .subscribe((response) => {
        console.log("getSupplyElementTemplates: ", response.data);

        this.supplyElementTemplates = response.data;
      });
  }

  getSupplyChainbyCompanyAndUser() {
    this.invitingCompany.valueChanges.subscribe((value) => {
      this.supplyChainService
        .getSupplyChainbyCompanyAndUser(value)
        .subscribe((response) => {
          this.supplyChainbyCompanyAndUser = response.data;
          this.addressForm.patchValue(this.supplyChainbyCompanyAndUser);
        });
    });
  }

  private buildForm() {
    this.addressForm = this.fb.group({
      companyId: ["", Validators.required],
      supplyChainElements: this.fb.array([]),
      billingCost: ["", Validators.maxLength(100)],
      totalCost: ["", Validators.maxLength(50)],
      sharePercentage: [""],
      idSupplyChain: ["", Validators.maxLength(100)],
    });
  }

  get elementsField() {
    return this.addressForm.get("supplyChainElements") as FormArray;
  }

  addElementField() {
    this.elementsField.push(this.crearElementField());
  }

  private crearElementField() {
    return this.fb.group({
      supplyElement: [""],
      chargePerson: ["", Validators.maxLength(100)],
      activities: ["", Validators.maxLength(1000)],
      cost: ["", Validators.maxLength(20)],
      quantity: ["", Validators.maxLength(15)],
      measurementUnit: ["", Validators.maxLength(50)],

      idSupplyChain: [""],
      idSupplyChainElement: [""],
      position: [""],
    });
  }

  borrarArray(borrarForm: any, i: number) {
    borrarForm.removeAt(i);
  }

  removeElement(i: number) {
    const tema = this.addressForm.get("tema");
    this.deleteTema(i);
  }

  deleteTema(i: number) {
    const element = this.elementsField.controls[i];

    console.log(element);

    this.borrarArray(this.elementsField, i);
    console.log("La información ha sido eliminada correctamente.");
  }

  formTemplate(id: number) {
    const template = this.supplyElementTemplates.find(
      (element) => element.enumerator === id
    ).templateInfo;
    console.log("template: ", template);
  }

  fetchElementImage(id: number) {
    const img = this.elementList.find((element) => element.id === id);
    return img;
  }

  valueNumber(id: string) {
    return String(this.addressForm.get(id).value).length;
  }

  valueNumber2(i: number, id: string) {
    return String(this.elementsField.controls[i].get(id).value).length;
  }

  changeElement(i: number) {
    this.elementActive = i;
  }

  calculatePercentageParticipationLogistics() {
    const billingCost = Number(this.addressForm.get("billingCost").value);
    const totalCost = Number(this.addressForm.get("totalCost").value);
    let result = 0;
    if (billingCost && totalCost) {
      result = (totalCost / billingCost) * 100;
    }
    this.addressForm.get("sharePercentage").setValue(`${result.toFixed(2)}%`);
  }

  // deleteElement(i: number) {
  //   this.elementsField.controls[i].get("supplyElement").setValue("");
  //   this.elementsField.controls[i].get("chargePerson").setValue("");
  //   this.elementsField.controls[i].get("measurementUnit").setValue("");
  //   this.elementsField.controls[i].get("quantity").setValue("");
  //   this.elementsField.controls[i].get("cost").setValue("");
  //   this.elementsField.controls[i].get("activities").setValue("");
  //   this.elementsField.controls[i].get("billingCost").setValue("");
  //   this.elementsField.controls[i].get("totalCost").setValue("");
  //   this.elementsField.controls[i]
  //     .get("sharePercentage")
  //     .setValue("");
  // }

  onSubmit() {
    console.log(this.addressForm);
  }
}
