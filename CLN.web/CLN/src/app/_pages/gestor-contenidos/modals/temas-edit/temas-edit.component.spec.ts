import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemasEditComponent } from './temas-edit.component';

describe('TemasEditComponent', () => {
  let component: TemasEditComponent;
  let fixture: ComponentFixture<TemasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
