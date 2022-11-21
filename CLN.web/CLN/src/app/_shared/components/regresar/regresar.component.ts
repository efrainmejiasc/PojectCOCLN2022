import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';

@Component({
  selector: 'app-regresar',
  templateUrl: './regresar.component.html',
  styleUrls: ['./regresar.component.scss']
})
export class RegresarComponent implements OnInit {

  @Input() linkTo = '';
  cambioSubscription:Subscription;
  salir:boolean = true;
  showAlertOut:boolean = false;

  notificationCambiosMessage="¿Desea salir sin guardar los cambios?"

  constructor(private layoutService:LayoutService,
    private router:Router) { }

  ngOnInit() {

    this.cambioSubscription = this.layoutService.cambiosEmisor.subscribe(data =>{
      this.salir = data;
    })
  }

  regresar(){

    const acceso = JSON.parse(localStorage.getItem("userCas"));
    
    if(this.salir){

      if(acceso){
        this.router.navigate([this.linkTo]);
      }else{
        this.router.navigate(['/']);
      }
      
    }else{
      this.showAlertOut = true;
    }
  }

  closePopupCambios(valor){

    this.showAlertOut = false;

    if(valor){
      this.router.navigate([this.linkTo]);
    }
  }
}
