import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersupComponent } from './bannersup.component';

describe('BannersupComponent', () => {
  let component: BannersupComponent;
  let fixture: ComponentFixture<BannersupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannersupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
