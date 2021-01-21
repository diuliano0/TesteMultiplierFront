import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShowItemPipe} from "./show-item.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShowItemPipe],
  exports:[ShowItemPipe]
})
export class ShowItemModule { }
