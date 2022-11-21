import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { groupRolGU } from 'src/app/_model/roles/groupRolGU.model';
import { groups } from 'src/app/_model/roles/groups.model';

@Component({
  selector: 'app-gestionar-rol-usuarios',
  templateUrl: './gestionar-rol-usuarios.component.html',
  styleUrls: [
    './gestionar-rol-usuarios.component.scss',
    "../../../../_shared/styles/modals.scss"
  ]
})
export class GestionarRolUsuariosComponent implements OnInit {
  sendedData;
  typeData;
  groupsList: Array<any> = [];
  textData;
  listGroup;
  groupArray: Array<groups>;
  groupSelected: groups;
  form: FormGroup;
  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.buildForm();

  }
  private pos: number = null;
  public allAreHere: Array<groupRolGU> = [];
  @ViewChild('div', { static: false }) divs: QueryList<ElementRef>
  public showAdmin: boolean = true;
  private buildForm() {
    this.form = this.formBuilder.group({})
    let i = 0;
    var listGroupsData: Array<groups> = this.groupsList;
    if (this.groupSelected != undefined) {
      var typeNewFieldMaster: string = listGroupsData.filter(e => e.id == this.groupSelected.id)[0].id + "";
      this.form.addControl(typeNewFieldMaster, new FormControl({ value: true, disabled: true }));
    }
    listGroupsData.forEach(groupsArray => {
      if (i != this.pos) {
        var addGroup: groupRolGU = new groupRolGU();
        addGroup.id = groupsArray.id;
        addGroup.nombre = groupsArray.nombre;
        addGroup.status = true;
        if (groupsArray.id == 4) {
          addGroup.status = false;
          if (this.groupSelected && this.groupSelected.id == 4) {
            addGroup.status = true;
          }
        }

        this.allAreHere.push(addGroup);
      }
      var typeNewFieldMaster: string = groupsArray.id + "";
      this.form.addControl(typeNewFieldMaster, new FormControl());
      if (groupsArray.id == 4) {
        this.form.get(typeNewFieldMaster).disable();
      }
      i++;
    });
    this.groupArray = listGroupsData;
    if (this.listGroup != undefined) {
      this.listGroup.forEach(allare => {
        this.form.get(allare.id + "").setValue(true);
      })
    }
  }
  public listGroupsSelected: Array<groups> = [];
  public passback() {
    let i = 0;
    this.groupsList.forEach(groupsArray => {
      if (i != this.pos) {
        var typeNewFieldMaster: string = groupsArray.id + "";
        if (this.form.get(typeNewFieldMaster).value == true) {
          this.listGroupsSelected.push(groupsArray);
        }
      }
      i++;
    });
    if (this.listGroupsSelected.length > 0) {
      this.modal.close(this.listGroupsSelected);
    }
  }
}
