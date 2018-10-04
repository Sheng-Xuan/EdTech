import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolPublishPageComponent } from './tool-publish-page.component';

describe('ToolPublishPageComponent', () => {
  let component: ToolPublishPageComponent;
  let fixture: ComponentFixture<ToolPublishPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolPublishPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolPublishPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
