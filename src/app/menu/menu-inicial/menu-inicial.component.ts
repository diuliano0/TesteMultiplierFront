import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.css']
})
export class MenuInicialComponent implements OnInit {

  public model: any[];

  constructor() {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'DashBoard', icon: 'dashboard', url: '/',
      }
    ];
  }

}
