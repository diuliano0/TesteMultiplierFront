import { TelefoneModule } from './telefone.module';

describe('TelefoneModule', () => {
  let telefoneModule: TelefoneModule;

  beforeEach(() => {
    telefoneModule = new TelefoneModule();
  });

  it('should create an instance', () => {
    expect(telefoneModule).toBeTruthy();
  });
});
