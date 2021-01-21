import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilialListComponent } from './filial-list.component';

describe('FilialListComponent', () => {
  let component: FilialListComponent;
  let fixture: ComponentFixture<FilialListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
