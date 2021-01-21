import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBlankListComponent } from './page-blank-list.component';

describe('PageBlankListComponent', () => {
  let component: PageBlankListComponent;
  let fixture: ComponentFixture<PageBlankListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBlankListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBlankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
