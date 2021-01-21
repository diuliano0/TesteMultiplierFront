import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-general',
  templateUrl: './menu-general.component.html',
  styleUrls: ['./menu-general.component.css']
})
export class MenuGeneralComponent implements OnInit {

  @Input('menu') menu;

  constructor() { }

  ngOnInit() {
  }

}
