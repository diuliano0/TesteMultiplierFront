import { DragDropModule } from './drag-drop.module';

describe('DragDropModule', () => {
  let dragDropModule: DragDropModule;

  beforeEach(() => {
    dragDropModule = new DragDropModule();
  });

  it('should create an instance', () => {
    expect(dragDropModule).toBeTruthy();
  });
});
