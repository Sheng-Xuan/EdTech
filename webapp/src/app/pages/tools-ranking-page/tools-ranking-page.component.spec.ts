import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsRankingPageComponent } from './tools-ranking-page.component';

describe('ToolsRankingPageComponent', () => {
  let component: ToolsRankingPageComponent;
  let fixture: ComponentFixture<ToolsRankingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsRankingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsRankingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
