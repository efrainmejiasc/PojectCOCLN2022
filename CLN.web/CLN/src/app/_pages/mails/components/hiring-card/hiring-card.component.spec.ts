import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringCardComponent } from './hiring-card.component';

describe('HiringCardComponent', () => {
  let component: HiringCardComponent;
  let fixture: ComponentFixture<HiringCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
