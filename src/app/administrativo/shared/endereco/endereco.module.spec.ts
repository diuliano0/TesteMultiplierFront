import { EnderecoModule } from './endereco.module';

describe('EnderecoModule', () => {
  let enderecoModule: EnderecoModule;

  beforeEach(() => {
    enderecoModule = new EnderecoModule();
  });

  it('should create an instance', () => {
    expect(enderecoModule).toBeTruthy();
  });
});
