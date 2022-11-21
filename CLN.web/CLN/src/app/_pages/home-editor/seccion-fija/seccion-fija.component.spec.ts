import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFijaComponent } from './seccion-fija.component';

describe('SeccionFijaComponent', () => {
  let component: SeccionFijaComponent;
  let fixture: ComponentFixture<SeccionFijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionFijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionFijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
