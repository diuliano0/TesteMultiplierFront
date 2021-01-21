import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropDirective} from './drag-drop.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [DragDropDirective],
    exports: [
        DragDropDirective
    ]
})
export class DragDropModule {
}
