import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarGrupoRolComponent } from './gestionar-grupo-rol.component';

describe('GestionarGrupoRolComponent', () => {
  let component: GestionarGrupoRolComponent;
  let fixture: ComponentFixture<GestionarGrupoRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarGrupoRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarGrupoRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
