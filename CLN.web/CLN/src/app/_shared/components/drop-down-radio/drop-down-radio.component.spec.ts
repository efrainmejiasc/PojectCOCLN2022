import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownRadioComponent } from './drop-down-radio.component';

describe('DropDownRadioComponent', () => {
  let component: DropDownRadioComponent;
  let fixture: ComponentFixture<DropDownRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
