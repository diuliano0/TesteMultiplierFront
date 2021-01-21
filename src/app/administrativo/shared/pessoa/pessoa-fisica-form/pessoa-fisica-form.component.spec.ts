import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaFisicaFormComponent } from './pessoa-fisica-form.component';

describe('PessoaFisicaFormComponent', () => {
  let component: PessoaFisicaFormComponent;
  let fixture: ComponentFixture<PessoaFisicaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaFisicaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaFisicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
