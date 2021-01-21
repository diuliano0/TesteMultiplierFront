import { FilialModule } from './filial.module';

describe('FilialModule', () => {
  let filialModule: FilialModule;

  beforeEach(() => {
    filialModule = new FilialModule();
  });

  it('should create an instance', () => {
    expect(filialModule).toBeTruthy();
  });
});
