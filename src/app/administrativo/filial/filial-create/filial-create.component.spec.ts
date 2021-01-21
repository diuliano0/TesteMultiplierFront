import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilialCreateComponent } from './filial-create.component';

describe('FilialCreateComponent', () => {
  let component: FilialCreateComponent;
  let fixture: ComponentFixture<FilialCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilialCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
