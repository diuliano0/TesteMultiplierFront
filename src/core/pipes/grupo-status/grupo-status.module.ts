import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrupoStatusPipe} from "./grupo-status.pipe";

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [GrupoStatusPipe],
    exports: [
        GrupoStatusPipe
    ]
})
export class GrupoStatusModule {
}
