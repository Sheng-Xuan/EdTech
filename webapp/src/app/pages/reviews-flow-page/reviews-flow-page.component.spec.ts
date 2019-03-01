import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsFlowPageComponent } from './reviews-flow-page.component';

describe('ReviewsFlowPageComponent', () => {
  let component: ReviewsFlowPageComponent;
  let fixture: ComponentFixture<ReviewsFlowPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsFlowPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsFlowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
