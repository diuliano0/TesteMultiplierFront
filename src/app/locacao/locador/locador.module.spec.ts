import { LocadorModule } from './locador.module';

describe('LocadorModule', () => {
  let locadorModule: LocadorModule;

  beforeEach(() => {
    locadorModule = new LocadorModule();
  });

  it('should create an instance', () => {
    expect(locadorModule).toBeTruthy();
  });
});
