import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecasFormComponent } from './bibliotecas-form.component';

describe('BibliotecasFormComponent', () => {
  let component: BibliotecasFormComponent;
  let fixture: ComponentFixture<BibliotecasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliotecasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
