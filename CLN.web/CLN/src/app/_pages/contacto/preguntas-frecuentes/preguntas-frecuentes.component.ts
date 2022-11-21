import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.scss']
})
export class PreguntasFrecuentesComponent implements OnInit {

  onclick: boolean = false;
  ListPreguntasFrecuentes: any;
  userlogged: any;

  constructor(
    public viewportScroller: ViewportScroller,
    private router: Router,
    private admin: AdminService,
    private auth: AuthenticationService
  ) {
    viewportScroller.scrollToPosition([0, 0]);
  }

  ngOnInit() {
    this.auth.actualUser$.subscribe(data => {
      this.userlogged = data;
    });
    this.getListPregunstasFreq();
  }

  do_Main() {
    this.router.navigate(['/autodiagnostico']);
  }

  do_show(id) {
    const divRes = document.getElementById('res' + id);
    if (divRes.className !== 'show') {
      divRes.className = 'show';

    } else {
      divRes.className = 'collapse';
    }
  }

  getListPregunstasFreq() {
    /*this.admin.getListPreguntasFreq().subscribe(res => {
      this.ListPreguntasFrecuentes = res.Result;
      console.log(res);
    // tslint:disable-next-line: no-unused-expression
    }), error => {
      console.log(error);
    };*/
  }

  closeModal() { }
}
