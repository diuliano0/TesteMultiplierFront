import { LocacoesModule } from './locacoes.module';

describe('LocacoesModule', () => {
  let locacoesModule: LocacoesModule;

  beforeEach(() => {
    locacoesModule = new LocacoesModule();
  });

  it('should create an instance', () => {
    expect(locacoesModule).toBeTruthy();
  });
});
