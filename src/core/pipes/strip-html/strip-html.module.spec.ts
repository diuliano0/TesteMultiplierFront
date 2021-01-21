import { StripHtmlModule } from './strip-html.module';

describe('StripHtmlModule', () => {
  let stripHtmlModule: StripHtmlModule;

  beforeEach(() => {
    stripHtmlModule = new StripHtmlModule();
  });

  it('should create an instance', () => {
    expect(stripHtmlModule).toBeTruthy();
  });
});
