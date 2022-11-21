import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownCheckListComponent } from './drop-down-checklist.component';

describe('DropDownListComponent', () => {
  let component: DropDownCheckListComponent;
  let fixture: ComponentFixture<DropDownCheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownCheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
