import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCadenaComponent } from './header-cadena.component';

describe('HeaderCadenaComponent', () => {
  let component: HeaderCadenaComponent;
  let fixture: ComponentFixture<HeaderCadenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderCadenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCadenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
