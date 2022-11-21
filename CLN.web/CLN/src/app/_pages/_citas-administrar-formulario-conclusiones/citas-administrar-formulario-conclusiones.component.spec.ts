import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasAdministrarFormularioConclusionesComponent } from './citas-administrar-formulario-conclusiones.component';

describe('CitasAdministrarFormularioConclusionesComponent', () => {
  let component: CitasAdministrarFormularioConclusionesComponent;
  let fixture: ComponentFixture<CitasAdministrarFormularioConclusionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasAdministrarFormularioConclusionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasAdministrarFormularioConclusionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
