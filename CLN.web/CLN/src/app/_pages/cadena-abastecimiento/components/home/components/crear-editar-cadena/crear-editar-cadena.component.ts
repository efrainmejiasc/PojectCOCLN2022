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
import { LayoutService } from "src/app/_services/_compras-publicas/layoutService.service";
import { environment } from "src/environments/environment";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-crear-editar-cadena',
  templateUrl: './crear-editar-cadena.component.html',
  styleUrls: ['./crear-editar-cadena.component.scss']
})

export class CrearEditarCadenaComponent implements OnInit {
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

  list = [
    {
        "supplyElement": "",
        "chargePerson": "",
        "activities": "",
        "cost": "",
        "quantity": "",
        "measurementUnit": "",
        "idSupplyChain": "",
        "idSupplyChainElement": "",
        "position": 1,
        "img": {
          "path": "",
          "name": ""
        }
    },
    {
        "supplyElement": "",
        "chargePerson": "",
        "activities": "",
        "cost": "",
        "quantity": "",
        "measurementUnit": "",
        "idSupplyChain": "",
        "idSupplyChainElement": "",
        "position": 2,
        "img": {
          "path": "",
          "name": ""
        }
    },
    {
        "supplyElement": "",
        "chargePerson": "",
        "activities": "",
        "cost": "",
        "quantity": "",
        "measurementUnit": "",
        "idSupplyChain": "",
        "idSupplyChainElement": "",
        "position": 3,
        "img": {
          "path": "",
          "name": ""
        }
    },
    {
        "supplyElement": "",
        "chargePerson": "",
        "activities": "",
        "cost": "",
        "quantity": "",
        "measurementUnit": "",
        "idSupplyChain": "",
        "idSupplyChainElement": "",
        "position": 4,
        "img": {
          "path": "",
          "name": ""
        }
    },
    {
        "supplyElement": "",
        "chargePerson": "",
        "activities": "",
        "cost": "",
        "quantity": "",
        "measurementUnit": "",
        "idSupplyChain": "",
        "idSupplyChainElement": "",
        "position": 5,
        "img": {
          "path": "",
          "name": ""
        }
    },
    {
        "supplyElement": "",
        "chargePerson": "",
        "activities": "",
        "cost": "",
        "quantity": "",
        "measurementUnit": "",
        "idSupplyChain": "",
        "idSupplyChainElement": "",
        "position": 6,
        "img": {
          "path": "",
          "name": ""
        }
    },
    {
        "supplyElement": "",
        "chargePerson": "",
        "activities": "",
        "cost": "",
        "quantity": "",
        "measurementUnit": "",
        "idSupplyChain": "",
        "idSupplyChainElement": "",
        "position": 7,
        "img": {
          "path": "",
          "name": ""
        }
    },
    {
        "supplyElement": "",
        "chargePerson": "",
        "activities": "",
        "cost": "",
        "quantity": "",
        "measurementUnit": "",
        "idSupplyChain": "",
        "idSupplyChainElement": "",
        "position": 8,
        "img": {
          "path": "",
          "name": ""
        }
    },
    {
        "supplyElement": "",
        "chargePerson": "",
        "activities": "",
        "cost": "",
        "quantity": "",
        "measurementUnit": "",
        "idSupplyChain": "",
        "idSupplyChainElement": "",
        "position": 9,
        "img": {
          "path": "",
          "name": ""
        }
    },
    {
        "supplyElement": "",
        "chargePerson": "",
        "activities": "",
        "cost": "",
        "quantity": "",
        "measurementUnit": "",
        "idSupplyChain": "",
        "idSupplyChainElement": "",
        "position": 10,
        "img": {
          "path": "",
          "name": ""
        }
    },
    {
        "supplyElement": "",
        "chargePerson": "",
        "activities": "",
        "cost": "",
        "quantity": "",
        "measurementUnit": "",
        "idSupplyChain": "",
        "idSupplyChainElement": "",
        "position": 11,
        "img": {
          "path": "",
          "name": ""
        }
    },
    {
        "supplyElement": "",
        "chargePerson": "",
        "activities": "",
        "cost": "",
        "quantity": "",
        "measurementUnit": "",
        "idSupplyChain": "",
        "idSupplyChainElement": "",
        "position": 12,
        "img": {
          "path": "",
          "name": ""
        }
    }
  ];

  elementActive = 0;
  supplyElements: any;
  supplyElementTemplates: any;
  supplyChainbyCompanyAndUser: any;
  elementSelected: number = 0;
  valueElementSelected = {
    "supplyElement": "",
    "chargePerson": "",
    "activities": "",
    "cost": "",
    "quantity": "",
    "measurementUnit": "",
    "idSupplyChain": "",
    "idSupplyChainElement": "",
    "position": 0,
    "img": {
      "path": "",
      "name": ""
    }
  };
  supplyChain = {
    "idSupplyChain": 0,
    "companyId": 0,
    "billingCost": 0,
    "totalCost": '',
    "sharePercentage": '',
    "supplyChainElements": []
  };
  showConfirmAlerta = false;
  alertMessage = ''
  showAlertMessage = false;
  elementToDelete: any;
  companySelected: number;
  enableSaveButton = false;

  constructor(
    private fb: FormBuilder,
    private gestionarDisponibilidadService: GestionarDisponibilidadService,
    private supplyChainService: SupplyChainService,
    private layoutService: LayoutService
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

  private buildForm() {
    this.addressForm = this.fb.group({
      companyId: ["", Validators.required],
      supplyChainElements: this.fb.array([]),
      billingCost: ["", Validators.maxLength(20)],
      totalCost: [0, Validators.maxLength(50)],
      sharePercentage: [""],
      idSupplyChain: ["", Validators.maxLength(100)],
    });
  }

  selectCompany(companyId: number){
    this.companySelected = companyId;
  }

  getEmpresas() {
    this.layoutService.showLoading();
      
    this.gestionarDisponibilidadService.getEmpresas().subscribe((response) => {
      this.companiesInvite = response.data;
      this.layoutService.closeLoading();
    }, error => {
      this.layoutService.closeLoading();
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
        this.supplyElementTemplates = response.data;
      });
  }

  getTitle(template: any){

    if(template.enumerator === 1){
      return 'Son modelos de transacciones comerciales entre empresas, por ejemplo, entre un fabricante y el distribuidor de un producto, o entre un distribuidor y un comercio minorista.'
    }else if(template.enumerator === 2){
      return 'Son modelos de negocio donde una empresa vende directamente para una persona física que será su consumidor final.'
    }

  }

  addDefaultTemplate(template: any[], baseTemplate = false){

    if(baseTemplate){
      this.supplyChain.billingCost = 0;
      // this.supplyChain.totalCost = '0';
      this.addressForm.get("billingCost").setValue(0);
      // this.addressForm.get("totalCost").setValue(0);
    }
    
    this.supplyChain = {
      "idSupplyChain": this.supplyChain.idSupplyChain ? this.supplyChain.idSupplyChain : 0,
      "companyId": this.supplyChain.companyId ? this.supplyChain.companyId : 0,
      "billingCost": this.supplyChain.billingCost ? this.supplyChain.billingCost : 0,
      "totalCost": this.supplyChain.totalCost ? this.supplyChain.totalCost : '',
      "sharePercentage": this.supplyChain.sharePercentage ? this.supplyChain.sharePercentage.toString() : '0',
      "supplyChainElements": []
    };

    this.list = [
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 1,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 2,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 3,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 4,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 5,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 6,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 7,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 8,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 9,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 10,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 11,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 12,
          "img": {
            "path": "",
            "name": ""
          }
      }
    ];
    

    this.enableSaveButton = true;

    this.list.map( (l, i) => {
      l.supplyElement = '';
      l.position = i + 1;
      l.img.path = '';
      l.img.name ='';
    });
    
    
    template.map((element: any) => {
      
      this.list[ element.position - 1 ] = {
        ...this.list[ element.position - 1 ],
        "supplyElement": element.supplyElement,
        "chargePerson": element.chargePerson,
        "activities": element.activities,
        "cost": `$ ${this.convertirCostoActual(element)}`,
        "quantity": element.quantity,
        "measurementUnit": element.measurementUnit,
        "idSupplyChain": element.idSupplyChain,
        "idSupplyChainElement": element.idSupplyChainElement,
        "position": element.position,
      };

      this.setImage(this.list[ element.position - 1 ]);

    });
  
    this.valueElementSelected = {
      "supplyElement": this.list[0].supplyElement,
      "chargePerson": this.list[0].chargePerson,
      "activities": this.list[0].activities,
      "cost": this.list[0].cost,
      "quantity": this.list[0].quantity,
      "measurementUnit": this.list[0].measurementUnit,
      "idSupplyChain": this.list[0].idSupplyChain,
      "idSupplyChainElement": this.list[0].idSupplyChainElement,
      "position": this.list[0].position,
      "img": { ...this.list[0].img }
    };

    this.elementSelected = 0;
    // this.valueElementSelected.cost = this.valueElementSelected.cost.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:.'<>\{\}\[\]\\\/]/gi, ',')

    this.calculateTotalCost();

  }

  convertirCostoActual( valor: any ){
    
    const internationalNumberFormat = new Intl.NumberFormat('en-US');
    let new_value = ''

    if( valor.cost ){
      let numero = valor.cost.toString().split('.')[0].toString();
      let desimal = valor.cost.toString().split('.')[1] ? valor.cost.toString().split('.')[1].toString() : '';
  
      let incluye_coma = valor.cost.toString().includes('.');
  
      let nuevo_numero = internationalNumberFormat.format( parseInt(numero) ).replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:,'<>\{\}\[\]\\\/]/gi, '.');
  
      new_value = `${nuevo_numero}${incluye_coma ? ',' : ''}${desimal}`;
    }

    return new_value;

  }

  getSupplyChainbyCompanyAndUser() {
    this.invitingCompany.valueChanges.subscribe((value) => {
      this.getInfo(value);
    });
  }

  getInfo(companyId: string | number){

    this.list = [
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 1,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 2,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 3,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 4,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 5,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 6,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 7,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 8,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 9,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 10,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 11,
          "img": {
            "path": "",
            "name": ""
          }
      },
      {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": 12,
          "img": {
            "path": "",
            "name": ""
          }
      }
    ];

    this.supplyChainService
    .getSupplyChainbyCompanyAndUser(companyId).subscribe((response) => {
      this.supplyChainbyCompanyAndUser = response.data;
  
      this.addressForm.patchValue(this.supplyChainbyCompanyAndUser);
        
      this.supplyChain = {
        ...this.supplyChain,
        "idSupplyChain": this.supplyChainbyCompanyAndUser.idSupplyChain,
        "companyId": this.supplyChainbyCompanyAndUser.companyId,
        "billingCost": this.supplyChainbyCompanyAndUser.billingCost,
        "totalCost": this.supplyChainbyCompanyAndUser.totalCost,
        "sharePercentage": this.supplyChainbyCompanyAndUser.sharePercentage,
      }

      this.validarCosto(this.supplyChain);


      
      this.addDefaultTemplate(this.supplyChainbyCompanyAndUser.supplyChainElements);
      
    }, error => {

    });
  }

  getElementName(supplyElements, elementSelected){

    if(supplyElements.length === 0 || !elementSelected.supplyElement) return '';

    const value = supplyElements.find( se => se.enumerator === elementSelected.supplyElement)
    return value.supplyElement;

  }

  setImage(element: any){
    const encontrado = this.supplyElements.find(e => e.enumerator === element.supplyElement);

    if( encontrado ){
      element.img.path = encontrado.additionalInfo[0].logo;
      element.img.name = encontrado.supplyElement;
    }

  }

  validar(elemento: any){

    if(!elemento.cost) {

      this.calculateTotalCost();

      return;
    }

    elemento.cost = this.agregarSeparadorNumerico(elemento.cost);
    (<HTMLInputElement>document.getElementById('cost')).value = elemento.cost;

    this.calculateTotalCost();

  }

  validarCosto(elemento: any){

    if(!elemento.billingCost) return;

    const arrayElement = elemento.billingCost.toString().split('');

    if(arrayElement[ arrayElement.length - 2 ] === '.' || arrayElement[ arrayElement.length - 3 ] === '.'){
      elemento.billingCost = elemento.billingCost.toString().replace('.', ',');
    }
    

    if(!elemento.billingCost) {

      this.calculatePercentageParticipationLogistics();

      return;
    }

    elemento.billingCost = this.agregarSeparadorNumerico(elemento.billingCost);
    (<HTMLInputElement>document.getElementById('billingCost')).value = elemento.billingCost;

    this.calculatePercentageParticipationLogistics();

  }

  agregarSeparadorNumerico(elemento: any){

    const internationalNumberFormat = new Intl.NumberFormat('en-US');

    if(!elemento.toString().replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:.'<>\{\}\[\]\\\/]/gi, '').replace(' ','')){
      return `$ 0`;
    }
    

    let numero = elemento.toString().split(',')[0].toString().replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:.'<>\{\}\[\]\\\/]/gi, '').replace(' ','').toString();
    let desimal = elemento.toString().split(',')[1] ? elemento.toString().split(',')[1].toString().replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:.'<>\{\}\[\]\\\/]/gi, '').toString() : '';

    let incluye_coma = elemento.toString().includes(',');

    let nuevo_numero = ''
    numero.split('').map((n, index) => {
      if(index < 12) nuevo_numero = nuevo_numero + n;
    });

    let nuevo_desimal = ''
    desimal.split('').map((d, index) => {
      if(index < 2) nuevo_desimal = nuevo_desimal + d;
    });

    nuevo_numero = internationalNumberFormat.format( parseInt(nuevo_numero) ).replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:,'<>\{\}\[\]\\\/]/gi, '.');

    return `$ ${nuevo_numero}${incluye_coma ? ',' : ''}${nuevo_desimal}`;

  }

  calculateTotalCost(){
    let total = 0;
    this.supplyChain.totalCost = '$ 0';

    const internationalNumberFormat = new Intl.NumberFormat('en-US');

    this.list.map( (element, i) => {
        const valor = element.cost ? parseFloat(element.cost.toString().replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:.'<>\{\}\[\]\\\/]/gi, '').replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:,'<>\{\}\[\]\\\/]/gi, '.').replace(' ','')) : 0;
        total += Number.isNaN(valor) ? 0 : valor
    });
    
    this.supplyChain.totalCost = total === 0 ? '' : `$ ${internationalNumberFormat.format( total ).toString().replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:,'<>\{\}\[\]\\\/]/gi, '.')}`;
    
    let newString = ''
    
    if(this.supplyChain.totalCost){
      const array = this.supplyChain.totalCost.split('');

      array.map((a, i) => {
          if(array.length - 3 === i && array[array.length - 3] === '.'){
            newString = newString + ','
          }else if(array.length - 2 === i && array[array.length - 2] === '.'){
            newString = newString + ','
          }else {
            newString = newString + a
          }
      });
      
      this.supplyChain.totalCost = newString
    }
    
    (<HTMLInputElement>document.getElementById('totalCost')).value = `${this.supplyChain.totalCost}`;
    this.addressForm.get("totalCost").setValue(this.supplyChain.totalCost);

    this.calculatePercentageParticipationLogistics();

  }

  calculatePercentageParticipationLogistics() {

    const replaceValueTotalCost = !this.supplyChain.totalCost ? '0' : this.supplyChain.totalCost.toString().replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:.'<>\{\}\[\]\\\/]/gi, '').replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:,'<>\{\}\[\]\\\/]/gi, '.')
    const replaceValueBillingCost = !this.supplyChain.billingCost ? "0" : this.supplyChain.billingCost.toString().replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:.'<>\{\}\[\]\\\/]/gi, '').replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:,'<>\{\}\[\]\\\/]/gi, '.')

    const billingCost = parseFloat(replaceValueBillingCost);
    const totalCost = parseFloat(replaceValueTotalCost);
    let result = 0;



    if (billingCost && totalCost) {
      result = (totalCost / billingCost) * 100;
    }

    console.log(billingCost, totalCost, result);
    

    this.supplyChain.sharePercentage = parseFloat(result.toFixed(2)).toString().replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:.'<>\{\}\[\]\\\/]/gi, ',');   
  }

  changeElement(i: number) {
    // this.elementActive = i;
    this.elementSelected = i;
    this.calculateTotalCost();
  }

  onSubmit() {

    let payload = {
      "idSupplyChain": this.supplyChain.idSupplyChain,
      "companyId": this.companySelected,
      "billingCost": !this.supplyChain.billingCost ? 0 : parseFloat(this.supplyChain.billingCost.toString().replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:.'<>\{\}\[\]\\\/]/gi, '').replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:,'<>\{\}\[\]\\\/]/gi, '.').replace(' ','')),
      "totalCost": !this.supplyChain.totalCost ? 0 : parseFloat(this.supplyChain.totalCost.toString().replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:.'<>\{\}\[\]\\\/]/gi, '').replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:,'<>\{\}\[\]\\\/]/gi, '.').replace(' ','')),
      "sharePercentage": this.supplyChain.sharePercentage.toString().replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:,'<>\{\}\[\]\\\/]/gi, '.'),
      "supplyChainElements": []
    };

    this.list.map( l => {
      if( l.supplyElement ){
        payload.supplyChainElements = [
          ...payload.supplyChainElements,
          {
            activities: l.activities,
            chargePerson: l.chargePerson,
            cost: !l.cost ? 0 : parseFloat(l.cost.toString().replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:.'<>\{\}\[\]\\\/]/gi, '').replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:,'<>\{\}\[\]\\\/]/gi, '.').replace(' ','')),
            idSupplyChain: this.supplyChain.idSupplyChain,
            idSupplyChainElement: l.idSupplyChainElement || 0,
            measurementUnit: l.measurementUnit,
            position: l.position,
            quantity: l.quantity,
            supplyElement: l.supplyElement,
          }
        ];
      }
    });

    this.layoutService.showLoading();

    this.supplyChainService.manageSupplyChain(payload).subscribe((response) => {
      this.layoutService.closeLoading();
      this.getInfo(this.companySelected);
      this.showConfirmAlerta = true;
    }, error => {
      console.log(error);
      
      this.layoutService.closeLoading();
    });
    
  }

  closePopup( value: any ){
    this.showConfirmAlerta = false;      
  }
  
  downloadFile(){

    const currentUser = JSON.parse(localStorage.getItem("userCas"));
    const companyId = this.addressForm.get('companyId').value;

    let anchor = document.createElement("a"); 
    document.body.appendChild(anchor); 
    let file = `${environment.apiUrl}/api/SupplyChain/DownloadSupplyChainbyCompanyAndUser?companyId=${companyId}`;
    let headers = new Headers(); 
    headers.append('Authorization', `Bearer ${currentUser.token}`);
    
    this.layoutService.showLoading();

    fetch(file, { headers })
      .then(response => response.blob())
      .then(blobby => { 
        let objectUrl = window.URL.createObjectURL(blobby); 
        anchor.href = objectUrl; 
        anchor.target = "blank";
        anchor.download = "Cadena de abastecimiento.pdf";
        anchor.click(); 
        window.URL.revokeObjectURL(objectUrl); 
        document.body.removeChild(anchor);

        this.layoutService.closeLoading();
      }, error => {
        this.layoutService.closeLoading();
      }
    );

  }

  removeElement(i: number) {

    this.elementToDelete = i;

    this.alertMessage = '¿Estás seguro que deseas eliminar este elemento y toda su información asociada?';
    this.showAlertMessage = true;

  }

  closePopupOptions(option){

    if(option){

      let element: any;

      element = {
        activities: this.list[this.elementToDelete].activities,
        chargePerson: this.list[this.elementToDelete].chargePerson,
        cost: !this.list[this.elementToDelete].cost ? 0 : parseFloat(this.list[this.elementToDelete].cost.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:.'<>\{\}\[\]\\\/]/gi, '').replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:,'<>\{\}\[\]\\\/]/gi, '.').replace(' ','')),
        idSupplyChain: this.list[this.elementToDelete].idSupplyChain,
        idSupplyChainElement: this.list[this.elementToDelete].idSupplyChainElement || 0,
        measurementUnit: this.list[this.elementToDelete].measurementUnit,
        position: this.list[this.elementToDelete].position,
        quantity: this.list[this.elementToDelete].quantity,
        supplyElement: this.list[this.elementToDelete].supplyElement,
      };
      
      if(element.idSupplyChainElement){

        this.layoutService.showLoading();

        this.supplyChainService.deleteSupplyChainElement(element).subscribe((response) => {
          
          this.layoutService.closeLoading();
          // this.getInfo(this.addressForm.get('companyId').value);
          this.showAlertMessage = false;

          this.list[this.elementToDelete] = {
            "supplyElement": "",
            "chargePerson": "",
            "activities": "",
            "cost": "",
            "quantity": "",
            "measurementUnit": "",
            "idSupplyChain": "",
            "idSupplyChainElement": "",
            "position": this.list[this.elementToDelete].position,
            "img": {
              "path": "",
              "name": ""
            }
          };

        }, error => {
          this.layoutService.closeLoading();
          this.showAlertMessage = false;
        });

      }else{

        this.list[this.elementToDelete] = {
          "supplyElement": "",
          "chargePerson": "",
          "activities": "",
          "cost": "",
          "quantity": "",
          "measurementUnit": "",
          "idSupplyChain": "",
          "idSupplyChainElement": "",
          "position": this.list[this.elementToDelete].position,
          "img": {
            "path": "",
            "name": ""
          }
        };

        this.calculateTotalCost();
        this.valueElementSelected = this.list[0];
        this.elementSelected = 0;
        this.showAlertMessage = false;
        
      }

    }else{
      this.showAlertMessage = false;
    }
    

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
      quantity: ["", Validators.maxLength(7)],
      measurementUnit: ["", Validators.maxLength(50)],

      idSupplyChain: [""],
      idSupplyChainElement: [""],
      position: [""],
    });
  }

  borrarArray(borrarForm: any, i: number) {
    borrarForm.removeAt(i);
  }

  deleteTema(i: number) {
    const element = this.elementsField.controls[i];
    this.borrarArray(this.elementsField, i);
  }

  formTemplate(id: any) {
    // const template = this.supplyElementTemplates.find(
    //   (element) => element.enumerator === id
    // ).templateInfo;
    
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

}
