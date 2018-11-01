import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolListPageComponent } from './tool-list-page.component';

describe('ToolListPageComponent', () => {
  let component: ToolListPageComponent;
  let fixture: ComponentFixture<ToolListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
