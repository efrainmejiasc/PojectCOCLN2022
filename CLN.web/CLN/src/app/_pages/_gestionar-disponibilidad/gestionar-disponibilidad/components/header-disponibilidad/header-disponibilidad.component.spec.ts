import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDisponibilidadComponent } from './header-disponibilidad.component';

describe('HeaderDisponibilidadComponent', () => {
  let component: HeaderDisponibilidadComponent;
  let fixture: ComponentFixture<HeaderDisponibilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDisponibilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
