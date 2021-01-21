import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTelefoneComponent } from './form-telefone.component';

describe('FormTelefoneComponent', () => {
  let component: FormTelefoneComponent;
  let fixture: ComponentFixture<FormTelefoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTelefoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTelefoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
