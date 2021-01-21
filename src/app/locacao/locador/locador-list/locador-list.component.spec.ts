import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocadorListComponent } from './locador-list.component';

describe('LocadorListComponent', () => {
  let component: LocadorListComponent;
  let fixture: ComponentFixture<LocadorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocadorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocadorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
