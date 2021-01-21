import { AdministrativoModule } from './administrativo.module';

describe('AdministrativoModule', () => {
  let administrativoModule: AdministrativoModule;

  beforeEach(() => {
    administrativoModule = new AdministrativoModule();
  });

  it('should create an instance', () => {
    expect(administrativoModule).toBeTruthy();
  });
});
