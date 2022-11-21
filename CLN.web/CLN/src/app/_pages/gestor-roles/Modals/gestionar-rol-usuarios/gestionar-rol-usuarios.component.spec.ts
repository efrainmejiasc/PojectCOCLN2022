import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarRolUsuariosComponent } from './gestionar-rol-usuarios.component';

describe('GestionarRolUsuariosComponent', () => {
  let component: GestionarRolUsuariosComponent;
  let fixture: ComponentFixture<GestionarRolUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarRolUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarRolUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
