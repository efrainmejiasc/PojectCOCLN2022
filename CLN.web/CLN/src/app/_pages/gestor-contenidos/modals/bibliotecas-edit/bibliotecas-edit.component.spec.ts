import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecasEditComponent } from './bibliotecas-edit.component';

describe('BibliotecasEditComponent', () => {
  let component: BibliotecasEditComponent;
  let fixture: ComponentFixture<BibliotecasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliotecasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
