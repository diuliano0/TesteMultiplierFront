import { RotaModule } from './rota.module';

describe('RotaModule', () => {
  let rotaModule: RotaModule;

  beforeEach(() => {
    rotaModule = new RotaModule();
  });

  it('should create an instance', () => {
    expect(rotaModule).toBeTruthy();
  });
});
