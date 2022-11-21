import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitarCitasComponent } from './invitar-citas.component';

describe('InvitarCitasComponent', () => {
  let component: InvitarCitasComponent;
  let fixture: ComponentFixture<InvitarCitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitarCitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitarCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
