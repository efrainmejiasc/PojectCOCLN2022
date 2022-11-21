import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-nombre-usuario',
  templateUrl: './barra-nombre-usuario.component.html',
  styleUrls: ['./barra-nombre-usuario.component.scss']
})
export class BarraNombreUsuarioComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  userlogged: any = 0;

  ngOnInit() {
    this.auth.actualUser$.subscribe(data => {
      this.userlogged = data;
    });
  }

  do_Main() {
    this.router.navigate(['/']);
  }

  @Output() evento = new EventEmitter<boolean>();
  toHome() {
    if(localStorage.getItem('position') && localStorage.getItem('position') == "child") {
      this.evento.next(true)
    } else {
      this.router.navigate(["/menudinamico"]);
    }
  }
}
