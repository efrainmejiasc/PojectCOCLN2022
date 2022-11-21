import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCadenaComponent } from './footer-cadena.component';

describe('FooterCadenaComponent', () => {
  let component: FooterCadenaComponent;
  let fixture: ComponentFixture<FooterCadenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterCadenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterCadenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
