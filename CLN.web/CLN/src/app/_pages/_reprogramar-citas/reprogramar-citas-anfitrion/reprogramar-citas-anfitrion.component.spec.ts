import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprogramarCitasAnfitrionComponent } from './reprogramar-citas-anfitrion.component';

describe('ReprogramarCitasAnfitrionComponent', () => {
  let component: ReprogramarCitasAnfitrionComponent;
  let fixture: ComponentFixture<ReprogramarCitasAnfitrionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprogramarCitasAnfitrionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprogramarCitasAnfitrionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
