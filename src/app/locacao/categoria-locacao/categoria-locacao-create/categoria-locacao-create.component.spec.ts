import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaLocacaoCreateComponent } from './categoria-locacao-create.component';

describe('CategoriaLocacaoCreateComponent', () => {
  let component: CategoriaLocacaoCreateComponent;
  let fixture: ComponentFixture<CategoriaLocacaoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaLocacaoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaLocacaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
