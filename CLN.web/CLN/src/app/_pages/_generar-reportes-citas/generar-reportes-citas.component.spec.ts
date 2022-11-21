import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarReportesCitasComponent } from './generar-reportes-citas.component';

describe('GenerarReportesCitasComponent', () => {
  let component: GenerarReportesCitasComponent;
  let fixture: ComponentFixture<GenerarReportesCitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarReportesCitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarReportesCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
