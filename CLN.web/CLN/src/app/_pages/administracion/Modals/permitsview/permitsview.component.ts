import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { hijos } from 'src/app/_model/roles/hijos.model';
import { permits } from 'src/app/_model/roles/permits.model';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';

@Component({
  selector: 'app-permitsview',
  templateUrl: './permitsview.component.html',
  styleUrls: ["../../../../_shared/styles/modals.scss",
    './permitsview.component.scss']
})
export class PermitsviewComponent implements OnInit {
  sendedData: Array<any>;
  idSelected: number;
  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private rolesService: GestorRolesService) { }

  ngOnInit() {
    this.getRolData();
  }
  public permitsContent: Array<permits> = [];
  public getRolData() {
    this.rolesService.getRolDetail(this.idSelected)
      .subscribe(rol => {
        this.permitsContent = [];
        rol[0].permisos.forEach(perms => {
          if (perms.idPadre == undefined) {
            if (this.permitsContent.filter(permit => permit.id == perms.id)[0] == null) {
              var permisos: permits = new permits();
              permisos.id = perms.id;
              permisos.nombre = perms.permiso;
              permisos.hijos = [];
              this.permitsContent.push(permisos);
            }
          } else {
            if (this.permitsContent.filter(permit => permit.id == perms.idPadre)[0] != undefined) {
              var childs: hijos = new hijos();
              childs.id = perms.id;
              childs.nombre = perms.permiso;
              this.permitsContent.filter(permit => permit.id == perms.idPadre)[0].hijos.push(childs);
            }
          }
        });
      })
  }

}
