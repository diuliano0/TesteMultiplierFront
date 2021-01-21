import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocacoesCreateComponent } from './locacoes-create.component';

describe('LocacoesCreateComponent', () => {
  let component: LocacoesCreateComponent;
  let fixture: ComponentFixture<LocacoesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocacoesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocacoesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
