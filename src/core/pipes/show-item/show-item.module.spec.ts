import { ShowItemModule } from './show-item.module';

describe('ShowItemModule', () => {
  let showItemModule: ShowItemModule;

  beforeEach(() => {
    showItemModule = new ShowItemModule();
  });

  it('should create an instance', () => {
    expect(showItemModule).toBeTruthy();
  });
});
