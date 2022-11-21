import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGruposRolesComponent } from './gestion-grupos-roles.component';

describe('GestionGruposRolesComponent', () => {
  let component: GestionGruposRolesComponent;
  let fixture: ComponentFixture<GestionGruposRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionGruposRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionGruposRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
