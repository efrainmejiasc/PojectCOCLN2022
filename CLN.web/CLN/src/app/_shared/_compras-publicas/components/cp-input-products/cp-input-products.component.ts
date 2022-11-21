import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { GestionMisInteresesService } from 'src/app/_services/_gestion-mis-intereses/gestion-mis-intereses.service';

@Component({
  selector: 'app-cp-input-products',
  templateUrl: './cp-input-products.component.html',
  styleUrls: ['./cp-input-products.component.scss']
})
export class CpInputProductsComponent implements OnInit {

  @Input() selectedItems:any[];
  @Input() showAlert:boolean;
  @Output() productsSelectedEmmiter = new EventEmitter<any>();

  ulP:HTMLElement;
  showModal:boolean = false;
  products:any = [];
  showAlertInfo:boolean = false;
  productosById = {};
  productosObjById = {};
  productosSelectedById = {};


  arbol:any[];

  constructor(private dataService:GestionMisInteresesService,
              private layoutService:LayoutService) {}

  ngOnInit() {
    //this.ulP = document.getElementById("results");
    //this.traerRecord(this.ulP, 0, this);
  };

  traerRecord(nodeCode: number, level: number){
    return this.dataService.getClassifiersNodeChildren2(nodeCode, level);
  };

  toogleModal(){

    this.traerRecord(0, 0).subscribe((response:any)=>{
      this.arbol = response.data.map( (item: any) => {
        return {
          ...item,
          show: false,
          checked: false,
          nivel: []
        }
      });
    });
    
    // this.showModal = !this.showModal;
    let div = document.getElementById("modal");
    div.style.display = "block";
  };

  closeModal(){
    this.showModal = !this.showModal;
    let div = document.getElementById("modal");
    div.style.display = "none";

    this.productsSelectedEmmiter.emit(this.selectedItems);
  }

  mostrar(level: number, item: { code: number, value: string, show: boolean, checked: boolean, nivel: any[] }){
    
    item.show = !item.show;

    if( item.show ){

      this.traerRecord(item.code, level).subscribe((response:any)=>{
        let nivel = response.data.map( (item: any) => {

          const encontrado = this.selectedItems.find( i => i.code === item.code );

          return {
            ...item,
            show: false,
            checked: encontrado ? true : false,
          }
        });
      
        item.nivel = nivel;

      });

    }

  }

  addOrDelete(item: any, nivelSuperior: any = {}){

    const encontrado = this.selectedItems.find( i => i.code === item.code );
    item.checked = !item.checked;

    if( encontrado ){
      this.selectedItems = this.selectedItems.filter( i => i.code !== item.code );
      this.productsSelectedEmmiter.emit(this.selectedItems);
      return;
    }

    const newItem = {
      ...item,
      value: `${ item.code } - ${ item.value }`
    }

    this.selectedItems = [
      ...this.selectedItems,
      newItem
    ];

    if(item.code.toString().length > 6){
      let parentId = parseInt(item.code.toString().substring(0, 6));

      this.selectedItems = this.selectedItems.filter( i => i.code !== parentId );
      this.productsSelectedEmmiter.emit(this.selectedItems);
      if(nivelSuperior.checked) nivelSuperior.checked = false;
    }

  }








  crearRow(parentEl, lista){
    for(var i=0; i<lista.length; i++){
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

      if(item.id.toString().length > 6){
        this.productosObjById[item.id] = lista1;
      };
    };
  };

  addProduct(product){

    product.selected = true;

    this.productosSelectedById[product.id] = product;
    this.selectedItems.push(product);

    for(let i=0; i<this.selectedItems.length; i++){
      let productS = this.selectedItems[i];
      let productId = productS.id;

      if(productId.toString().length > 6){

        let parentId = parseInt(productId.toString().substring(0, 6));

        if(product.id === parentId){
          productS.selected = false;
        }
      }
    }

    this.actualizarLista()
  }

  removeProduct(product){
    for(var i=0; i<this.selectedItems.length; i++){
      let productData = this.selectedItems[i];

      if(productData.id){

        if(productData.id === product.id){
          this.selectedItems.splice(i, 1);
          if(productData.checkBox){
            productData.checkBox.checked = false;
          };

        };
      };
    };

    this.productsSelectedEmmiter.emit(this.selectedItems);
  };

  actualizarLista = function(){

    let nuevaLista = [];
    this.productosSelectedById = {};

    for(let i=0; i<this.selectedItems.length; i++){
      let product = this.selectedItems[i];

      if(product.selected){
        nuevaLista.push(product)
        this.productosSelectedById[product.id] = product;
      };
    };

    this.selectedItems = nuevaLista;

    this.productsSelectedEmmiter.emit(this.selectedItems);
  }

  handleAlertInfo(){
    this.showAlertInfo = true;
  }

  closeAlertInfo(){
    this.showAlertInfo = false;
  }
};


function cE(tagName, parentEl){
  var elemento = document.createElement(tagName);
  if(parentEl){
    parentEl.appendChild(elemento);
  };

  return elemento;
};

function ListaP(thisParentObj){
  this.id;
  this.name = "";
  this.div;
  this.divChild;
  this.img;
  this.checkBox;
  this.pNameContainer;
  this.iconSrc = "assets/imgs/iconos/carpeta.svg";
  this.iconSrcOpen = "assets/imgs/iconos/carpeta-open.svg";
  this.list = [];
  this.isOpen = false;
  this.showLista = false;
  this.hasChilds = false;
  this.isParent = false;
  this.isSelected = false;
  this.disableCheckBox = false;

  this.crear = function(parentEl){

    parentEl.innerHTML = "";

    var thisObj = this;

    this.div = cE("div", parentEl);
    this.div.className = "product-row";

    if(this.id.toString().length < 7){
      this.img = cE("img", this.div);
      //this.img.style.opacity = this.hasChilds ? "1" : "0";
      this.img.src = this.iconSrc;
      this.img.addEventListener("click", function(){
        thisObj.open();
      });
    }else{
      this.img = cE("img", this.div);
      this.img.style.opacity = 0;
      this.img.src = this.iconSrc;
    }

    if(this.id.toString().length >= 5){

      if(this.id.toString().length === 6){
        this.isParent = true;
      };

      for(let i=0; i<thisParentObj.selectedItems.length; i++){
        let product = thisParentObj.selectedItems[i];

        if(product.id === this.id){
          this.isSelected = true;
          thisParentObj.selectedItems.splice(i, 1);
          thisParentObj.addProduct(this);
          break;
        };
      };

      if(this.id.toString().length > 6){

        let productIdString = this.id.toString();

        let parentId = parseInt(productIdString.substring(0, 6));

        if(thisParentObj.productosSelectedById[parentId]){
          this.disableCheckBox = true;
          thisParentObj.removeProduct(thisObj);
        };
      };

      this.checkBox = cE("input", this.div);
      this.checkBox.style.opacity = (this.disableCheckBox) ? 0.3 : 1;
      this.checkBox.disabled = this.disableCheckBox;
      this.checkBox.type = "checkbox";
      this.checkBox.checked = (this.isSelected && !this.disableCheckBox) ? true : false;
      this.checkBox.addEventListener("click", function(){

        if(thisObj.checkBox.checked){
          thisObj.isSelected = true;
        }else{
          thisObj.isSelected = false;
        }

        if(thisObj.isParent){
          thisObj.selectChildrens();
        }else{
          thisObj.unSelectParent();
        };

        if(thisObj.checkBox.checked){
          thisParentObj.addProduct(thisObj);
        }else{
          thisParentObj.removeProduct(thisObj);
        };
      });
    };

    let p = cE("p", this.div);
    p.style.opacity = (this.disableCheckBox) ? 0.3 : 1;
    p.innerHTML = this.name;
    this.pNameContainer = p;
  };

  this.selectChildrens = ()=>{

    for(let i=0; i<thisParentObj.selectedItems.length; i++){
      let product = thisParentObj.selectedItems[i];

      if(product.id){
        let productIdString = product.id.toString();

        let parentId = productIdString.substring(0, 6);

        if(this.id === +parentId){
          if(product.checkBox){
            product.checkBox.checked = false;
          };
        };
      };
    };

    for(let key in thisParentObj.productosById){

      let idString = key.toString();

      let parentId = idString.substring(0, 6);

      if(this.id === +parentId){

        let producto = thisParentObj.productosObjById[key];

        if(producto.checkBox){
          if(this.isSelected){
            producto.checkBox.disabled = true;
            producto.checkBox.style.opacity = 0.3;
            producto.pNameContainer.style.opacity = 0.3;
          }else{
            producto.checkBox.disabled = false;
            producto.checkBox.style.opacity = 1;
            producto.pNameContainer.style.opacity = 1;
          };
        };
      };
    };

    this.actualizarLista();
  };

  this.actualizarLista = function(){

    let nuevaLista = [];
    thisParentObj.productosSelectedById = {};

    for(let i=0; i<thisParentObj.selectedItems.length; i++){
      let product = thisParentObj.selectedItems[i];

      if(product.checkBox){
        if(product.checkBox.checked){
          nuevaLista.push(product)
          thisParentObj.productosSelectedById[product.id] = product;
        };
      }else if(product.selected){
        nuevaLista.push(product);
      }
    };

    thisParentObj.selectedItems = nuevaLista;
  }

  this.unSelectParent = ()=>{
    this.id;

    let idString = this.id.toString();

    let parentId = idString.substring(0, 6);

    for(let i=0; i<thisParentObj.selectedItems.length; i++){
      let product = thisParentObj.selectedItems[i];
      if(product.id === +parentId){
        product.checkBox.checked = false;
        thisParentObj.selectedItems.splice(i, 1);
      };
    };
  };

  this.open = function(){

    this.divChild.innerHTML = "";

    if(this.isOpen){
      this.isOpen = false;
      this.img.src = this.iconSrc;
      this.divChild.style.display = "none";
    }else{
      this.isOpen = true;
      this.img.src = this.iconSrcOpen;
      this.divChild.style.display = "block";
      this.getRecord(this.divChild, this.id, thisParentObj);
    };
  };
};


