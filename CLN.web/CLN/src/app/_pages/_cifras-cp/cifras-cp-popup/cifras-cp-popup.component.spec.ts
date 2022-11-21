import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CifrasCpPopupComponent } from './cifras-cp-popup.component';

describe('CifrasCpPopupComponent', () => {
  let component: CifrasCpPopupComponent;
  let fixture: ComponentFixture<CifrasCpPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CifrasCpPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CifrasCpPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
