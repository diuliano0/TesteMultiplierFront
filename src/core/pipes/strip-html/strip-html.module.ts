import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StripHtmlPipe} from './strip-html.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [StripHtmlPipe],
    exports: [
        StripHtmlPipe
    ]
})
export class StripHtmlModule {
}
