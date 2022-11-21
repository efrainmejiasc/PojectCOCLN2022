import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferOptionsComponent } from './offer-options.component';

describe('OfferOptionsComponent', () => {
  let component: OfferOptionsComponent;
  let fixture: ComponentFixture<OfferOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
