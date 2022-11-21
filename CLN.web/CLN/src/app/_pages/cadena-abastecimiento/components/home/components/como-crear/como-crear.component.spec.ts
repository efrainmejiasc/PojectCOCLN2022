import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoCrearComponent } from './como-crear.component';

describe('ComoCrearComponent', () => {
  let component: ComoCrearComponent;
  let fixture: ComponentFixture<ComoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
