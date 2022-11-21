import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { GestionMisInteresesService } from 'src/app/_services/_gestion-mis-intereses/gestion-mis-intereses.service';

@Component({
  selector: 'app-cp-input-products-acquisition-plans',
  templateUrl: './cp-input-products-acquisition-plans.component.html',
  styleUrls: ['./cp-input-products-acquisition-plans.component.scss']
})
export class CpInputProductsAcquisitionPlansComponent implements OnInit {

  @Input() selectedItems: any[]
  @Output() productsSelectedEmmiter = new EventEmitter<any>();

  ulP: HTMLElement;
  showModal: boolean = false;
  products: any = [];

  constructor(private dataService: GestionMisInteresesService,
    private layoutService: LayoutService) { }

  ngOnInit() {
    this.ulP = document.getElementById("results");
    this.traerRecord(this.ulP, 0, this);
  };

  traerRecord(element: HTMLElement, id: number, thisOBj: this) {
    thisOBj.dataService.getClassifiersNodeChildren(id).subscribe((response: any) => {
      let data = response.data;

      let lista = [];

      for (var i = 0; i < data.length; i++) {
        let record = data[i];
        let item = {
          id: record.code,
          name: record.code + record.value,
          items: null
        }
        lista.push(item);
      };
      thisOBj.crearRow(element, lista);
    });
  };

  toogleModal() {
    this.showModal = !this.showModal;
    let div = document.getElementById("modal");
    div.style.display = "block";
  };

  closeModal() {
    this.showModal = !this.showModal;
    let div = document.getElementById("modal");
    div.style.display = "none";

    this.productsSelectedEmmiter.emit(this.selectedItems);
  }

  crearRow(parentEl, lista) {
    for (var i = 0; i < lista.length; i++) {
      var item = lista[i];

      let div = cE("div", parentEl);
      div.className = "product-row-item";

      let lista1 = new ListaP(this);
      lista1.id = item.id;
      lista1.name = item.name;
      lista1.getRecord = this.traerRecord;

      lista1.crear(div);

      let divP = cE("div", div);
      //divP.style.display = "none";
      divP.innerHTML = ""
      lista1.divChild = divP;
    };
  };

  addProduct(product) {
    this.selectedItems.push(product);
  }

  removeProduct(product) {
    for (var i = 0; i < this.selectedItems.length; i++) {
      let productData = this.selectedItems[i];

      if (productData.selected) {
        productData.selected = false;
      }

      if (productData.id) {
        if (productData.id === product.id) {
          this.selectedItems.splice(i, 1);
        };
      };
    };

    this.productsSelectedEmmiter.emit(this.selectedItems);
  };
};


function cE(tagName, parentEl) {
  var elemento = document.createElement(tagName);
  if (parentEl) {
    parentEl.appendChild(elemento);
  };

  return elemento;
};

function Productos() {
  this.productos = {};

  this.addProductos = function () {

  }
}

function ListaP(thisParentObj) {
  this.id;
  this.name = "";
  this.div;
  this.divChild;
  this.img;
  this.checkBox;
  this.iconSrc = "assets/imgs/iconos/carpeta.svg";
  this.iconSrcOpen = "assets/imgs/iconos/carpeta-open.svg";
  this.list = [];
  this.isOpen = false;
  this.showLista = false;
  this.hasChilds = false;
  this.isParent = false;

  this.crear = function (parentEl) {

    parentEl.innerHTML = "";

    var thisObj = this;

    this.div = cE("div", parentEl);
    this.div.className = "product-row";

    if (this.id.toString().length < 7) {
      this.img = cE("img", this.div);
      //this.img.style.opacity = this.hasChilds ? "1" : "0";
      this.img.src = this.iconSrc;
      this.img.addEventListener("click", function () {
        thisObj.open();
      });
    };

    if (this.id.toString().length >= 5) {

      if (this.id.toString().length === 6) {
        this.isParent = true;
      };

      this.checkBox = cE("input", this.div);
      this.checkBox.type = "checkbox";
      this.checkBox.id = this.id;
      this.checkBox.addEventListener("click", function () {

        if (thisObj.isParent) {
          thisObj.selectChildrens();
        } else {
          thisObj.unSelectParent();
        };

        if (thisObj.checkBox.checked) {
          thisParentObj.addProduct(thisObj);
        } else {
          thisParentObj.removeProduct(thisObj);
        };
      });
    };

    let p = cE("p", this.div);
    p.innerHTML = this.name;
  };

  this.selectChildrens = () => {

    for (let i = 0; i < thisParentObj.selectedItems.length; i++) {
      let product = thisParentObj.selectedItems[i];

      if (product.id) {
        let productIdString = product.id.toString();

        let parentId = productIdString.substring(0, 6);

        if (this.id === +parentId) {
          product.checkBox.checked = false;
        };
      };
    };

    this.actualizarLista();
  };

  this.actualizarLista = function () {

    let nuevaLista = [];

    for (let i = 0; i < thisParentObj.selectedItems.length; i++) {
      let product = thisParentObj.selectedItems[i];

      if (product.checkBox) {
        if (product.checkBox.checked) {
          nuevaLista.push(product)
        };
      } else if (product.selected) {
        nuevaLista.push(product);
      }
    };

    thisParentObj.selectedItems = nuevaLista;
  }

  this.unSelectParent = () => {
    this.id;

    let idString = this.id.toString();

    let parentId = idString.substring(0, 6);

    for (let i = 0; i < thisParentObj.selectedItems.length; i++) {
      let product = thisParentObj.selectedItems[i];
      if (product.id === +parentId) {
        product.checkBox.checked = false;
        thisParentObj.selectedItems.splice(i, 1);
      };
    };
  };

  this.open = function () {
    if (this.isOpen) {
      this.isOpen = false;
      this.img.src = this.iconSrc;
      this.divChild.style.display = "none";
    } else {
      this.isOpen = true;
      this.img.src = this.iconSrcOpen;
      this.divChild.style.display = "block";
      this.getRecord(this.divChild, this.id, thisParentObj);
    };
  };
};