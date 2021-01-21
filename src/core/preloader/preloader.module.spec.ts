import { PreloaderModule } from './preloader.module';

describe('PreloaderModule', () => {
  let preloaderModule: PreloaderModule;

  beforeEach(() => {
    preloaderModule = new PreloaderModule();
  });

  it('should create an instance', () => {
    expect(preloaderModule).toBeTruthy();
  });
});
