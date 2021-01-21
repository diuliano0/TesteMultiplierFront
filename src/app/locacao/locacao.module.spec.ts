import { LocacaoModule } from './locacao.module';

describe('LocacaoModule', () => {
  let locacaoModule: LocacaoModule;

  beforeEach(() => {
    locacaoModule = new LocacaoModule();
  });

  it('should create an instance', () => {
    expect(locacaoModule).toBeTruthy();
  });
});
