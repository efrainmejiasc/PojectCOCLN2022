import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerprincipalComponent } from './bannerprincipal.component';

describe('BannerprincipalComponent', () => {
  let component: BannerprincipalComponent;
  let fixture: ComponentFixture<BannerprincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerprincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
