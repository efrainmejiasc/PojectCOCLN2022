import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoCitasComponent } from './encabezado-citas.component';

describe('EncabezadoCitasComponent', () => {
  let component: EncabezadoCitasComponent;
  let fixture: ComponentFixture<EncabezadoCitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncabezadoCitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
