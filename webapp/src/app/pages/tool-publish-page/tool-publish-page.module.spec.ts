import { ToolPublishPageModule } from './tool-publish-page.module';

describe('ToolPublishPageModule', () => {
  let toolPublishPageModule: ToolPublishPageModule;

  beforeEach(() => {
    toolPublishPageModule = new ToolPublishPageModule();
  });

  it('should create an instance', () => {
    expect(toolPublishPageModule).toBeTruthy();
  });
});
