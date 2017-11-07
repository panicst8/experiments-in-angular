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

import { DynoComponent } from './shared/components/dyno/dyno.component';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterContentInit {
   @ViewChild('alertContainer', { read: ViewContainerRef })
   container;
   componentRef: ComponentRef<any>;

   myIcons = [
      { name: 'history', action: 'do history!' },
      { name: 'home', action: 'go home?' },
      { name: 'help', action: 'get help.' },
   ];

   constructor(private resolver: ComponentFactoryResolver) {}

   createComponent(type: any) {
      // this.container.clear(); // this  would be to empty target before adding another
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(DynoComponent);

      this.componentRef = this.container.createComponent(factory);

      this.componentRef.instance.type = type;

      this.componentRef.instance.output.subscribe(event => console.log(event));
   }

   ngOnDestroy() {
      this.componentRef.destroy();
   }

   ngOnInit() {
      this.myIcons.forEach(x => {
         this.createComponent(x);
      });
   }

   ngAfterContentInit() {}
}
