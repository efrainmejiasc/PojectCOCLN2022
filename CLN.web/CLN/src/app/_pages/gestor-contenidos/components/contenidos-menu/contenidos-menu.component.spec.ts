import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosMenuComponent } from './contenidos-menu.component';

describe('ContenidosMenuComponent', () => {
  let component: ContenidosMenuComponent;
  let fixture: ComponentFixture<ContenidosMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidosMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
