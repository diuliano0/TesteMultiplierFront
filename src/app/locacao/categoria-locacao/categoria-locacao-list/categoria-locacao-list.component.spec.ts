import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaLocacaoListComponent } from './categoria-locacao-list.component';

describe('CategoriaLocacaoListComponent', () => {
  let component: CategoriaLocacaoListComponent;
  let fixture: ComponentFixture<CategoriaLocacaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaLocacaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaLocacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
