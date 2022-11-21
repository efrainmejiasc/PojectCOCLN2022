import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioAlertasComponent } from './envio-alertas.component';

describe('EnvioAlertasComponent', () => {
  let component: EnvioAlertasComponent;
  let fixture: ComponentFixture<EnvioAlertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioAlertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
