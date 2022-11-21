import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodiagnosticoEvaluacionComponent } from './autodiagnostico-evaluacion.component';

describe('AutodiagnosticoEvaluacionComponent', () => {
  let component: AutodiagnosticoEvaluacionComponent;
  let fixture: ComponentFixture<AutodiagnosticoEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutodiagnosticoEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodiagnosticoEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
