import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroFormComponent } from './tablero-form.component';

describe('TableroFormComponent', () => {
  let component: TableroFormComponent;
  let fixture: ComponentFixture<TableroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
