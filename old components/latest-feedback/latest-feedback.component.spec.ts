import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestFeedbackComponent } from './latest-feedback.component';

describe('LatestFeedbackComponent', () => {
  let component: LatestFeedbackComponent;
  let fixture: ComponentFixture<LatestFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
