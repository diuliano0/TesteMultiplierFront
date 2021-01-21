import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaCreateComponent } from './rota-create.component';

describe('RotaCreateComponent', () => {
  let component: RotaCreateComponent;
  let fixture: ComponentFixture<RotaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
