import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosMessageComponent } from './contenidos-message.component';

describe('ContenidosMessageComponent', () => {
  let component: ContenidosMessageComponent;
  let fixture: ComponentFixture<ContenidosMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidosMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidosMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
