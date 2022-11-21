import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConsolidadosService } from 'src/app/_services/_consolidados/consolidados.service';

import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { buildDate } from 'src/utils/buildDate';
import { buildExcel } from 'src/utils/buildExcel';
import { DialogData } from 'src/app/_pages/_ofertas/components/detalles/detalles.component';
import { currencyFormat } from 'src/utils/currencyFormat';

export interface Products {
  id: number;
  value: number;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.scss']
})
export class ConsolidadoComponent implements OnInit {
  
  element_data: any[] = [];

  arbol = []

  isPdpSelected = false;
  isCpSelected = false;
  showLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ConsolidadoComponent>, 
    private consolidadosService: ConsolidadosService,
    private layoutService:LayoutService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.layoutService.showLoading();
   
    this.obtenerPrimerNivel();

  }

  obtenerPrimerNivel(){

    const payload = {
      strPDP: this.isPdpSelected ? 'SI' : 'NO',
      strCP: this.isCpSelected ? 'SI' : 'NO',
    }

    this.showLoading = true;

    this.arbol = [];
    this.element_data = [];

    this.consolidadosService.getZeroNivel( this.data.esColombiaProductiva, payload ).subscribe((data: any) => {
      
      data && data.map( (dato: any, index: number) => {
        this.arbol = [ 
          ...this.arbol, 
          {
            cantidadContratos: dato.cantidadContratos,
            description: dato.description,
            valorContratacion: dato.valorContratacion,
            code: `PN_${index}`,
            nivel: [],
          }
        ]
      } );
      this.layoutService.closeLoading();
      this.showLoading = false;
    }, error => {
      this.layoutService.closeLoading();
      this.showLoading = false;
    });
  }

  generarExcel() {

    if( this.element_data.length === 0 ){
      return;
    }

    let elementos = [];

    this.element_data.map( element => {
      elementos = [ 
        ...elementos, 
        { 
          id: element.id,
          value: `$ ${ currencyFormat(element.value) }`,
          quantity: element.quantity,
          grupo: element.grupo,
          descripcion: element.description
        } 
      ];
    });

    const date = buildDate();
    const header=["Código","Valor de contrato", "Cantidad de contratos", "Grupo", "Descripción de código de Naciones Unidas UNSPSC"];
    
    let name=``;

    if(this.data.idOpcion == 1){
      name=`Procesos contratación pública por clasificación de UNSPSC ${date}`;
    }else if(this.data.idOpcion == 2){
      name=`Procesos contratación pública por clasificación de CP ${date}`;
    }else if(this.data.idOpcion == 3){
      name=`Planes anuales por clasificación de UNSPSC ${date}`;
    }else if(this.data.idOpcion == 4){
      name=`Planes anuales por clasificación de CP ${date}`;
    }

    buildExcel(header, elementos, name, 'ConsolidadoClasificaUN');

  }

  generarExcelCP() {
    
    if( this.element_data.length === 0 ){
      return;
    }

    let elementos = [];

    this.element_data.map( element => {
      elementos = [ 
        ...elementos, 
        { 
          id: element.id,
          value: `$ ${ currencyFormat(element.value) }`,
          quantity: element.quantity,
          sector: element.sector,
          description: element.description
        } 
      ];
    });

    const date = buildDate();
    const header=["Código","Valor de contrato", "Cantidad de contratos", "Sector", "Descripción de código de Naciones Unidas UNSPSC"];
    
    let name=``;

    if(this.data.idOpcion == 1){
      name=`Procesos contratación pública por clasificación de UNSPSC ${date}`;
    }else if(this.data.idOpcion == 2){
      name=`Procesos contratación pública por clasificación de CP ${date}`;
    }else if(this.data.idOpcion == 3){
      name=`Planes anuales por clasificación de UNSPSC ${date}`;
    }else if(this.data.idOpcion == 4){
      name=`Planes anuales por clasificación de CP ${date}`;
    }

    buildExcel(header, elementos, name, 'ConsolidadoClasificaUN');

  }

  mostrar(item: any, nivel: string, i: any) {

    this.layoutService.showLoading();
    
    if( nivel === 'zeroNivel' ){

      if( this.arbol[ i[0] ].show ) {
        this.arbol[ i[0] ].show = false;
        this.layoutService.closeLoading();
        return;
      }
      

      if( this.data.opcion === 'VER CONSOLIDADO POR PRODUCTOS Y SERVICIOS DE NACIONES UNIDAS UNSPSC' ){
        this.consolidadosService.getPrimerNivel(item, this.data.esColombiaProductiva).subscribe((data: any) => {
          

          this.arbol[ i[0] ].nivel = [];
  
          data && data.map( (dato: any, index: number) => {
            this.arbol[ i[0] ].nivel = [ 
              ...this.arbol[ i[0] ].nivel, 
              {
                cantidadContratos: dato.cantidadContratos,
                description: dato.description,
                valorContratacion: dato.valorContratacion,
                code: `${item.code}_SN_${index}`,
                id: dato.id,
              }
            ]
          } );
  
          this.arbol[ i[0] ].show = true;
  
          this.arbol[ i[0] ].nivel && this.arbol[ i[0] ].nivel.map((d: any, index: number) => {
            const encontrado = this.element_data.find( elemento => elemento.code === d.code );
            if( encontrado ) this.arbol[ i[0] ].nivel[index].check = true;
          });
  
          this.layoutService.closeLoading();
        }, error => {
          this.layoutService.closeLoading();
        });
      }else{

        const payload = {
          strPDP: this.isPdpSelected ? 'SI' : 'NO',
          strCP: this.isCpSelected ? 'SI' : 'NO',
        }

        this.showLoading = true;

        this.consolidadosService.getCuartoNivel(item, this.data.esColombiaProductiva, payload).subscribe((data: any) => {

          this.arbol[ i[0] ].nivel = [];
  
          data && data.map( (dato: any, index: number) => {
            this.arbol[ i[0] ].nivel = [ 
              ...this.arbol[ i[0] ].nivel, 
              {
                cantidadContratos: dato.cantidadContratos,
                description: dato.description,
                valorContratacion: dato.valorContratacion,
                code: `${item.code}_SN_${index}`,
                id: dato.id,
              }
            ]
          } );
  
          this.arbol[ i[0] ].show = true;
  
          this.arbol[ i[0] ].nivel && this.arbol[ i[0] ].nivel.map((d: any, index: number) => {
            const encontrado = this.element_data.find( elemento => elemento.code === d.code );
            if( encontrado ) this.arbol[ i[0] ].nivel[index].check = true;
          });
  
          this.layoutService.closeLoading();
          this.showLoading = false;
        }, error => {
          this.layoutService.closeLoading();
          this.showLoading = false;
        });
      }

    }else if( nivel === 'primerNivel' ){

      if( this.arbol[ i[0] ].nivel[ i[1] ].show ) {
        this.arbol[ i[0] ].nivel[ i[1] ].show = false;
        this.layoutService.closeLoading();
        return;
      }

      if( this.data.opcion === 'VER CONSOLIDADO POR PRODUCTOS Y SERVICIOS DE NACIONES UNIDAS UNSPSC' ){

        this.consolidadosService.getSegundoNivel(item, this.data.esColombiaProductiva).subscribe((data: any) => {

          this.arbol[ i[0] ].nivel[ i[1] ].nivel = [];
  
          data && data.map( (dato: any, index: number) => {
            this.arbol[ i[0] ].nivel[ i[1] ].nivel = [ 
              ...this.arbol[ i[0] ].nivel[ i[1] ].nivel, 
              {
                cantidadContratos: dato.cantidadContratos,
                description: dato.description,
                valorContratacion: dato.valorContratacion,
                code: `${item.code}_TN_${index}`,
                id: dato.id,
              }
            ]
          } );
  
          this.arbol[ i[0] ].nivel[ i[1] ].show = true;
  
          this.arbol[ i[0] ].nivel[ i[1] ].nivel && this.arbol[ i[0] ].nivel[ i[1] ].nivel.map((d: any, index: number) => {
            const encontrado = this.element_data.find( elemento => elemento.code === d.code );
            if( encontrado ) this.arbol[ i[0] ].nivel[ i[1] ].nivel[index].check = true;
          });
  
          this.layoutService.closeLoading();
  
        }, error => {
          this.layoutService.closeLoading();
        });

      }else{

        const payload = {
          strPDP: this.isPdpSelected ? 'SI' : 'NO',
          strCP: this.isCpSelected ? 'SI' : 'NO',
        }

        this.showLoading = true;

        this.consolidadosService.getQuintoNivel(item, this.data.esColombiaProductiva, payload).subscribe((data: any) => {

          this.arbol[ i[0] ].nivel[ i[1] ].nivel = [];
  
          data && data.map( (dato: any, index: number) => {
            this.arbol[ i[0] ].nivel[ i[1] ].nivel = [ 
              ...this.arbol[ i[0] ].nivel[ i[1] ].nivel, 
              {
                cantidadContratos: dato.cantidadContratos,
                description: dato.description,
                valorContratacion: dato.valorContratacion,
                code: `${item.code}_TN_${index}`,
                id: dato.id,
              }
            ]
          } );
  
          this.arbol[ i[0] ].nivel[ i[1] ].show = true;
  
          this.arbol[ i[0] ].nivel[ i[1] ].nivel && this.arbol[ i[0] ].nivel[ i[1] ].nivel.map((d: any, index: number) => {
            const encontrado = this.element_data.find( elemento => elemento.code === d.code );
            if( encontrado ) this.arbol[ i[0] ].nivel[ i[1] ].nivel[index].check = true;
          });
  
          this.layoutService.closeLoading();

          this.showLoading = false;
  
        }, error => {
          this.layoutService.closeLoading();
        });

      }

    }else if( nivel === 'segundoNivel' ){

      if( this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].show ) {
        this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].show = false;
        this.layoutService.closeLoading();
        return;
      }

      this.consolidadosService.getTercerNivel(item, this.data.esColombiaProductiva).subscribe((data: any) => {

        this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel = [];

        data && data.map( (dato: any, index: number) => {
          this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel = [ 
            ...this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel, 
            {
              cantidadContratos: dato.cantidadContratos,
              description: dato.description,
              valorContratacion: dato.valorContratacion,
              code: `${item.code}_CN_${index}`,
              id: dato.id,
            }
          ]
        } );

        this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].show = true;

        this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel && this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel.map((d: any, index: number) => {
          const encontrado = this.element_data.find( elemento => elemento.code === d.code );
          if( encontrado ) this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[index].check = true;
        });

        this.layoutService.closeLoading();

      }, error => {
        this.layoutService.closeLoading();
      });

    }else if( nivel === 'tercerNivel' ){

      if( this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].show ) {
        this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].show = false;
        this.layoutService.closeLoading();
        return;
      }

      const payload = {
        strPDP: this.isPdpSelected ? 'SI' : 'NO',
        strCP: this.isCpSelected ? 'SI' : 'NO',
      }

      this.consolidadosService.getCuartoNivel(item, this.data.esColombiaProductiva, payload).subscribe((data: any) => {

        this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel = [];

        data && data.map( (dato: any, index: number) => {
          this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel = [ 
            ...this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel, 
            {
              cantidadContratos: dato.cantidadContratos,
              description: dato.description,
              valorContratacion: dato.valorContratacion,
              code: `${item.code}_QN_${index}`,
              id: dato.id,
            }
          ]
        } );

        this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].show = true;

        this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel && this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel.map((d: any, index: number) => {
          const encontrado = this.element_data.find( elemento => elemento.code === d.code );
          if( encontrado ) this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel[index].check = true;
        });

        this.layoutService.closeLoading();

      }, error => {
        this.layoutService.closeLoading();
      });

    }else if( nivel === 'cuartoNivel' ){

      if( this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel[ i[4] ].show ) {
        this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel[ i[4] ].show = false;
        this.layoutService.closeLoading();
        return;
      }

      const payload = {
        strPDP: this.isPdpSelected ? 'SI' : 'NO',
        strCP: this.isCpSelected ? 'SI' : 'NO',
      }

      this.consolidadosService.getQuintoNivel(item, this.data.esColombiaProductiva, payload).subscribe((data: any) => {

        this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel[ i[4] ].nivel = [];

        data && data.map( (dato: any, index: number) => {
          this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel[ i[4] ].nivel = [ 
            ...this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel[ i[4] ].nivel, 
            {
              cantidadContratos: dato.cantidadContratos,
              description: dato.description,
              valorContratacion: dato.valorContratacion,
              code: `${item.code}_SN_${index}`,
              id: dato.id,
            }
          ]
        } );

        this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel[ i[4] ].show = true;

        this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel && this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel[ i[4] ].nivel.map((d: any, index: number) => {
          const encontrado = this.element_data.find( elemento => elemento.code === d.code );
          if( encontrado ) this.arbol[ i[0] ].nivel[ i[1] ].nivel[ i[2] ].nivel[ i[3] ].nivel[ i[4] ].nivel[index].check = true;
        });

        this.layoutService.closeLoading();

      }, error => {
        this.layoutService.closeLoading();
      });

    }
  }

  add(item: any, grupo: any) {

    if(this.element_data.find(data => data.code === item.code)){     
      this.element_data = this.element_data.filter(data => data.code !== item.code)
    }else{
      this.element_data = [
        ...this.element_data, 
        {
          id: item.id, 
          value: item.valorContratacion, 
          quantity: item.cantidadContratos,
          description: item.description,
          code: item.code,
          grupo: grupo.description
        }
      ];
    }

  }

  addCP(item: any, sector: any) {

    if(this.element_data.find(data => data.code === item.code)){     
      this.element_data = this.element_data.filter(data => data.code !== item.code)
    }else{
      this.element_data = [
        ...this.element_data, 
        {
          id: item.id, 
          value: item.valorContratacion, 
          quantity: item.cantidadContratos,
          description: item.description,
          code: item.code,
          sector: sector.description
        }
      ];
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }

  formatearPrecio(valor: string) {
    const newValor = parseInt(valor);
    const formato = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(newValor);
    return formato.replace('COP', '').trim();
  }

}
