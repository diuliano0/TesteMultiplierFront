import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-acesso-negado',
  templateUrl: './acesso-negado.component.html',
  styleUrls: ['./acesso-negado.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AcessoNegadoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  retornar() {
    this.router.navigate(['/']);
  }
}
