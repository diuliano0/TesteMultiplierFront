import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {BreadcrumbService} from '../../core/q-breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-locacao',
  templateUrl: './locacao.component.html',
  styleUrls: ['./locacao.component.css']
})
export class LocacaoComponent implements OnInit {

  crumbs$: Observable<MenuItem[]>;

  constructor(private breadcrumb: BreadcrumbService) {}

  ngOnInit() {
    this.crumbs$ = this.breadcrumb.crumbs$;
  }

}
