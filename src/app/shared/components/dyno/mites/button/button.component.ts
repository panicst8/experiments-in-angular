import {
  Component,
  NgModule,
  Input,
  ComponentFactory,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ChangeDetectorRef,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  AfterContentInit,
} from '@angular/core';

import { ButtonInterface } from './button.interface';
import { ButtonTypes } from './button.enum';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { range } from 'rxjs/observable/range';

// OLD WAY
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/Rx';

// NEW WAY
import { map, filter, tap, debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './button.template.html',
})
export class ButtonComponent implements OnInit {
  buttonTypes = ButtonTypes; // This is to allow enums in template

  @Input() data: ButtonInterface;
  @Output() output = new EventEmitter();

  clicks = new Subject();

  constructor() {}

  ngOnInit() {
    this.clicks
      .pipe(
        tap(click => console.log('click')),
        debounceTime(this.data.debounceTime),
      )
      .subscribe(e => {
        console.log(e);
      });
  }
}
