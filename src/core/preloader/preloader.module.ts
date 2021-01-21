import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloaderFullComponent} from "./preloader-full/preloader-full.component";
import {PreloaderService} from "../services/preloader.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PreloaderFullComponent,
  ],
  providers: [
    PreloaderService
  ],
  exports:[
    PreloaderFullComponent
  ]
})
export class PreloaderModule { }
