import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscrositiosBannerComponent } from './miscrositios-banner.component';

describe('MiscrositiosBannerComponent', () => {
  let component: MiscrositiosBannerComponent;
  let fixture: ComponentFixture<MiscrositiosBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscrositiosBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscrositiosBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
