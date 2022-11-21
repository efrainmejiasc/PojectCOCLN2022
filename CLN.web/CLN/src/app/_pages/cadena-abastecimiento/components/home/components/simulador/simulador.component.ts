import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss']
})
export class SimuladorComponent implements OnInit {

  simulator_url: string;
  url: string = location.origin;
  
  constructor() { }

  ngOnInit() {
    if(this.url === 'http://localhost:4200') this.url = 'https://ptp-servicios.compralonuestro.co'
    this.simulator_url = `${this.url}/simulator/`;


    const interval = setInterval(() => {

      const iframe = document.querySelector("iframe");

      if( iframe ){
        
        const element = iframe.contentWindow.document.getElementById('playImage');
        
        if( element ){
          element.click();
          clearInterval(interval);
        }

      }
      
    }, 1000)

  }

  descargar(){
    window.open(`${this.url}/assets/files/instructivo/Simulador_logistico.pdf`, '_blank');
  }

}
