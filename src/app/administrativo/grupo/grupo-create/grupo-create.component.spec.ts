import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoCreateComponent } from './grupo-create.component';

describe('GrupoCreateComponent', () => {
  let component: GrupoCreateComponent;
  let fixture: ComponentFixture<GrupoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
