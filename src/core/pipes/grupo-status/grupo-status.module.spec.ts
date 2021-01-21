import { GrupoStatusModule } from './grupo-status.module';

describe('GrupoStatusModule', () => {
  let grupoStatusModule: GrupoStatusModule;

  beforeEach(() => {
    grupoStatusModule = new GrupoStatusModule();
  });

  it('should create an instance', () => {
    expect(grupoStatusModule).toBeTruthy();
  });
});
