import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QBreadcrumbComponent } from './q-breadcrumb.component';

describe('QBreadcrumbComponent', () => {
  let component: QBreadcrumbComponent;
  let fixture: ComponentFixture<QBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
