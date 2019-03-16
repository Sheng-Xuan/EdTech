import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBugPageComponent } from './report-bug-page.component';

describe('ReportBugPageComponent', () => {
  let component: ReportBugPageComponent;
  let fixture: ComponentFixture<ReportBugPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBugPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBugPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
