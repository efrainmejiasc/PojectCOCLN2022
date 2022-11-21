import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNotificationsComponent } from './content-notifications.component';

describe('ContentNotificationsComponent', () => {
  let component: ContentNotificationsComponent;
  let fixture: ComponentFixture<ContentNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
