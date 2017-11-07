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

import { Observable } from 'rxjs/Observable';
import { range } from 'rxjs/observable/range';

// OLD WAY
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/Rx';

// NEW WAY
import { map, filter, tap } from 'rxjs/operators';

@Component({
   // tslint:disable-next-line:component-selector
   selector: 'dyno',
   template: `
   <span class="done">
   <button mat-fab>
     <mat-icon (click)="output.next(type.action)">{{type.name}}</mat-icon>
   </button>
 </span>
      `,
})
export class DynoComponent {
   @Input() type = { name: 'success' };
   @Output() output = new EventEmitter();
}
