import { CategoriaLocacaoModule } from './categoria-locacao.module';

describe('CategoriaLocacaoModule', () => {
  let categoriaLocacaoModule: CategoriaLocacaoModule;

  beforeEach(() => {
    categoriaLocacaoModule = new CategoriaLocacaoModule();
  });

  it('should create an instance', () => {
    expect(categoriaLocacaoModule).toBeTruthy();
  });
});
