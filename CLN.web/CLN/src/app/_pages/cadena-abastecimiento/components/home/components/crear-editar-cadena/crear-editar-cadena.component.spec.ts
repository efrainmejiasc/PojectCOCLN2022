import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarCadenaComponent } from './crear-editar-cadena.component';

describe('CrearEditarCadenaComponent', () => {
  let component: CrearEditarCadenaComponent;
  let fixture: ComponentFixture<CrearEditarCadenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarCadenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarCadenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
