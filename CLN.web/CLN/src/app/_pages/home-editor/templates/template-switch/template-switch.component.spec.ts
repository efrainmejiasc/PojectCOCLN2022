import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSwitchComponent } from './template-switch.component';

describe('TemplateSwitchComponent', () => {
  let component: TemplateSwitchComponent;
  let fixture: ComponentFixture<TemplateSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
