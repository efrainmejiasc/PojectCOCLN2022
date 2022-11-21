import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDinamicoComponent } from './menu-dinamico.component';

describe('MenuDinamicoComponent', () => {
  let component: MenuDinamicoComponent;
  let fixture: ComponentFixture<MenuDinamicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDinamicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDinamicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
