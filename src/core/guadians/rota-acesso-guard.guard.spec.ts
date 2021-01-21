import { TestBed, async, inject } from '@angular/core/testing';

import { RotaAcessoGuardGuard } from './rota-acesso-guard.guard';

describe('RotaAcessoGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RotaAcessoGuardGuard]
    });
  });

  it('should ...', inject([RotaAcessoGuardGuard], (guard: RotaAcessoGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
