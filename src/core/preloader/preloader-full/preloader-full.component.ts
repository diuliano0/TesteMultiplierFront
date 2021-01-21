import { Component } from '@angular/core';
import { PreloaderService } from '../../services/preloader.service';

@Component({
  selector: 'preloader-full',
  styleUrls: ['./preloader-full.component.css'],
  templateUrl: './preloader-full.component.html'
})
export class PreloaderFullComponent {

  constructor(public preloaderService: PreloaderService) {
  }
}
