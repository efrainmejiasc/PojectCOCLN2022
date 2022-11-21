import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasAnfitrionComponent } from './citas-anfitrion.component';

describe('CitasAnfitrionComponent', () => {
  let component: CitasAnfitrionComponent;
  let fixture: ComponentFixture<CitasAnfitrionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasAnfitrionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasAnfitrionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
