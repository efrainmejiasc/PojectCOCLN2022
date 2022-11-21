import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodiagnosticoComponent } from './autodiagnostico.component';

describe('AutodiagnosticoComponent', () => {
  let component: AutodiagnosticoComponent;
  let fixture: ComponentFixture<AutodiagnosticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutodiagnosticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
