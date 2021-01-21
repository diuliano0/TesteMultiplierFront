import { QBreadcrumbModule } from './q-breadcrumb.module';

describe('QBreadcrumbModule', () => {
  let qBreadcrumbModule: QBreadcrumbModule;

  beforeEach(() => {
    qBreadcrumbModule = new QBreadcrumbModule();
  });

  it('should create an instance', () => {
    expect(qBreadcrumbModule).toBeTruthy();
  });
});
