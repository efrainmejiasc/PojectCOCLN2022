import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasInvitarANegociosVirtualesComponent } from './citas-invitar-a-negocios-virtuales.component';

describe('CitasInvitarANegociosVirtualesComponent', () => {
  let component: CitasInvitarANegociosVirtualesComponent;
  let fixture: ComponentFixture<CitasInvitarANegociosVirtualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasInvitarANegociosVirtualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasInvitarANegociosVirtualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
