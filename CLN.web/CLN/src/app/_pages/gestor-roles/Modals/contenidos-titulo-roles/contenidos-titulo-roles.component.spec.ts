import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosTituloRolesComponent } from './contenidos-titulo-roles.component';

describe('ContenidosTituloRolesComponent', () => {
  let component: ContenidosTituloRolesComponent;
  let fixture: ComponentFixture<ContenidosTituloRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidosTituloRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidosTituloRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
