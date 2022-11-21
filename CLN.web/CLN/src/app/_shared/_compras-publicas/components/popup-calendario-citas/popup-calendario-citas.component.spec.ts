import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCalendarioCitasComponent } from './popup-calendario-citas.component';

describe('PopupCalendarioCitasComponent', () => {
  let component: PopupCalendarioCitasComponent;
  let fixture: ComponentFixture<PopupCalendarioCitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCalendarioCitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCalendarioCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
