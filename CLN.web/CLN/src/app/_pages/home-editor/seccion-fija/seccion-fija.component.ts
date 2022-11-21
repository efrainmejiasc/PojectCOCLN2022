import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seccion-fija',
  templateUrl: './seccion-fija.component.html',
  styleUrls: ['./seccion-fija.component.scss']
})
export class SeccionFijaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  isPlansAcquisition: boolean = environment.isPlansAcquisition;

  goToCifras(){
    this.router.navigate(['/report-analysis']);
  }

  goToProcesosDeContratacion(){
    this.router.navigate(['/contracting-process']);
  }

  goToPlanesDeAdquisicion(){
    this.router.navigate(['/annual-acquisition-plans']);
  }
}
