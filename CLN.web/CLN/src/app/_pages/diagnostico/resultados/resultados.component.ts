import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { Router } from '@angular/router';
import { AutodiagnosticoService } from 'src/app/_services/autodiagnostico.service';
import * as moment from 'moment';
import * as momentz from 'moment-timezone';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  userlogged: any;
  afirmaciones: any[] = [];
  questions: any[] = [];
  resultados = [];
  fechasHeader: any = [];
  FechasTH: any;
  public unicDate: any = [];
  is_loading = false;
  is_loading_dict = {};


  constructor(private auth: AuthenticationService, private router: Router, private service_Auto: AutodiagnosticoService) { }

  ngOnInit() {
    this.auth.actualUser$.subscribe(data => {
      console.log("login data");
      console.log(data);
      this.userlogged = data;
      moment.locale('es');

    });
    // this.do_getAfirmaciones();
    this.do_getResultados();
  }
  do_Main() {
    this.router.navigate(['/admin'], {});
  }

  do_getAfirmaciones() {
    this.service_Auto.loadQuestions(this.userlogged.idUsuario).subscribe(result => {
      console.log("et afirmaciones en result");
      this.questions = result;
      console.log(this.questions);

      for (let i = 0; i < this.questions.length; i++) {

        this.afirmaciones.push(this.questions[i]);
        if (this.afirmaciones[i].categoria == "SECCION_#1_DIAGNOSTICO_CAPACIDADES_ESTRATÉGICAS") {
          this.afirmaciones[i].categoria = "E";
        } else if (this.questions[i].categoria == "SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS1" || this.questions[i].categoria == "SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS2" || this.questions[i].categoria == "SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS3" || this.questions[i].categoria == "SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS4") {
          this.afirmaciones[i].categoria = "T";
        } else if (this.afirmaciones[i].categoria == "SECCION_#3_DIAGNOSTICO_CAPACIDADES_PERSONALES") {
          this.afirmaciones[i].categoria = "P";
        } else {
          this.afirmaciones[i].categoria;
        }
        this.afirmaciones.push((this.afirmaciones[i].calificacion != undefined) ? this.afirmaciones[i].calificacion : 0);
        console.log("this.afirmaciones");
        console.log(this.afirmaciones);
      }
    }, error => {
      console.log(error);
    });
  }


  do_getResultados() {
      console.log(this.userlogged)
    this.service_Auto.getResultados(this.userlogged.idUsuario).subscribe(result => {
      console.log("resultados");
      console.log(result);
      this.resultados = result;
      this.do_spinnersResultados(result);
    }, error => {
      console.log(error);
    });

  }

  do_spinnersResultados(resultados) {
      resultados['Header'].forEach(element => {
          this.is_loading_dict[element['numeroAutodiagnostico']] = false
      });
      console.log('loadingf', this.is_loading_dict)
  }

  descargarAutodiagnostigo(version)
  {
      this.is_loading_dict[version] = true
      this.service_Auto.descargarAutodiagnostigo(this.userlogged.idUsuario, version).subscribe(result => {
      this.downLoadFile(result, "application/pdf", "reporteAutodiagnostico", ".pdf")
      this.is_loading_dict[version] = false;
    });
  }


  downLoadFile(data: any, mediaType, titulo,formato) {

    let blob = new Blob([data], { type: mediaType });

    if (mediaType == formato) {
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert('Please disable your Pop-up blocker or AdBlocker and try again.');
      }
      var filename = titulo+formato;
      FileSaver.saveAs(blob, filename);
    } else {
      var filename = titulo+formato;
      FileSaver.saveAs(blob, filename);
    }

  }




}
