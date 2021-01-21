import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocadorCreateComponent } from './locador-create.component';

describe('LocadorCreateComponent', () => {
  let component: LocadorCreateComponent;
  let fixture: ComponentFixture<LocadorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocadorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocadorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
