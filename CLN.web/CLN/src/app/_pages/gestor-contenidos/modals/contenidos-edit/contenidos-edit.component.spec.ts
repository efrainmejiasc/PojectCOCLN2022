import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosEditComponent } from './contenidos-edit.component';

describe('ContenidosEditComponent', () => {
  let component: ContenidosEditComponent;
  let fixture: ComponentFixture<ContenidosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
