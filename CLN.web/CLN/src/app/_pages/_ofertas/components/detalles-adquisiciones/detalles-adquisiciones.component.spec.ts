import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAdquisicionesComponent } from './detalles-adquisiciones.component';

describe('DetallesAdquisicionesComponent', () => {
  let component: DetallesAdquisicionesComponent;
  let fixture: ComponentFixture<DetallesAdquisicionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesAdquisicionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesAdquisicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
