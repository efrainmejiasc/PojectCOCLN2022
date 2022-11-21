import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  title = 'CLN';
  dataHome: any;
  bannersup: any;
  userlogged: any;
  listPreguntas: any[];

  public mainbanner = new Array();

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private auth: AuthenticationService,
  ) {
    this.spinner.show();
    setTheme('bs4');
  }

  do_Main() {
    this.router.navigate(['/admin'], {});
  }

  ngOnInit() {
    this.auth.actualUser$.subscribe(data => {
      this.userlogged = data;
    });

    this.auth.actualUser$
    .subscribe(data => {});
  }

  public closeActionByOutsideClick: any;
  public identifyClickOutSide(event) {
    this.closeActionByOutsideClick = event;
  }
}

