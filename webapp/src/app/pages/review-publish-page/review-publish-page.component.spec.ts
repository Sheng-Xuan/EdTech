import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPublishPageComponent } from './review-publish-page.component';

describe('ReviewPublishPageComponent', () => {
  let component: ReviewPublishPageComponent;
  let fixture: ComponentFixture<ReviewPublishPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewPublishPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPublishPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
