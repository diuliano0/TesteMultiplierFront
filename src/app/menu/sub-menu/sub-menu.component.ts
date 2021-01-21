import {MenuItem} from 'primeng/api';
import {AppComponent} from '../../app.component';
import {Router} from '@angular/router';
import {Component, Input} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Location} from '@angular/common';


@Component({
  /* tslint:disable:component-selector */
  selector: '[app-sub-menu]',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
  providers: [
    Location
  ],
  animations: [
    trigger('children', [
      state('hidden', style({
        height: '0px'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class SubMenuComponent {

  @Input() item: MenuItem;

  @Input() root: boolean;

  @Input() visible: boolean;

  _parentActive: boolean;

  activeIndex: number;

  hover: boolean;

  constructor(public app: AppComponent, public router: Router, public location: Location) {}

  itemClick(event: Event, item: MenuItem, index: number) {
    // avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    // activate current item and deactivate active sibling if any
    this.activeIndex = (this.activeIndex === index) ? null : index;

    // execute command
    if (item.command) {
      item.command({originalEvent: event, item: item});
    }

    // prevent hash change
    if (item.items || (!item.url && !item.routerLink)) {
      event.preventDefault();
    }

    // hide menu
    if (!item.items && this.app.overlay) {
      this.app.sidebarActive = false;
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  unsubscribe(item: any) {
    if (item.eventEmitter) {
      item.eventEmitter.unsubscribe();
    }

    if (item.items) {
      for (const childItem of item.items) {
        this.unsubscribe(childItem);
      }
    }
  }

  @Input() get parentActive(): boolean {
    return this._parentActive;
  }

  set parentActive(val: boolean) {
    this._parentActive = val;

    if (!this._parentActive) {
      this.activeIndex = null;
    }
  }
}
