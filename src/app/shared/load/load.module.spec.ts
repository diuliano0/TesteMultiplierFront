import { LoadModule } from './load.module';

describe('LoadModule', () => {
  let loadModule: LoadModule;

  beforeEach(() => {
    loadModule = new LoadModule();
  });

  it('should create an instance', () => {
    expect(loadModule).toBeTruthy();
  });
});
