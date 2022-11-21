import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosFormComponent } from './contenidos-form.component';

describe('ContenidosFormComponent', () => {
  let component: ContenidosFormComponent;
  let fixture: ComponentFixture<ContenidosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
