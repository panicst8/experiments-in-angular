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
  template: `
  <mat-button-toggle-group [vertical]="data.isVertical"
    #group="matButtonToggleGroup" *ngIf="data.buttonType == 'toggle'">

   <mat-button-toggle (click)="clicks.next($event, buttonData)" *ngFor="let buttonData of data.buttons">
     <span *ngIf="buttonData.text && buttonData.textPosition == 'left'">{{buttonData.text}}&ngsp;</span>
     <mat-icon *ngIf="buttonData.icon">{{buttonData.icon.name}}</mat-icon>
     <span *ngIf="buttonData.text && buttonData.textPosition == 'right'">&ngsp;{{buttonData.text}}</span>
     <span *ngIf="buttonData.text && buttonData.textPosition == 'center'">{{buttonData.text}}</span>
   </mat-button-toggle>

   </mat-button-toggle-group>

   <button mat-fab
   color="{{data.buttonColor}}" 
           [disabled]="data.buttonDisabled"
           [style.cursor]="data.buttonCursor"
           (click)="clicks.next({event: $event, data: data})"
           *ngIf="data.buttonType == 'fab'"><mat-icon>{{data.name}}</mat-icon></button>
   <button mat-mini-fab color="{{data.buttonColor}}" (click)="clicks.next($event)" *ngIf="data.buttonType == 'miniFab'">
     <mat-icon>{{data.name}}</mat-icon>
   </button>
   <button mat-raised-button color="{{data.buttonColor}}" (click)="clicks.next($event)" *ngIf="data.buttonType == 'raised'">
     <mat-icon>{{data.name}}</mat-icon>
   </button>
   <button mat-icon-button color="{{data.buttonColor}}" (click)="clicks.next($event)" *ngIf="data.buttonType == 'iconButton'">
     <mat-icon>{{data.name}}</mat-icon>
   </button>
   <button mat-button color="{{data.buttonColor}}" (click)="clicks.next($event)" *ngIf="data.buttonType == 'basic'">{{data.name}}</button>
      `,
})
export class ButtonComponent implements OnInit {
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
