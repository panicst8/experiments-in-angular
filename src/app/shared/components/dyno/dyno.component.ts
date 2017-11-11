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

import { ButtonComponent } from './mites/button/button.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dyno',
  template: `<ng-template #target></ng-template>`,
})
export class DynoComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild('target', { read: ViewContainerRef })
  container;
  @Input('data') data;

  componentRef: ComponentRef<any>;
  constructor(private resolver: ComponentFactoryResolver) {}

  createComponent(miteConfig: any) {
    // this.container.clear(); // this  would be to empty target before adding another
    const factory: ComponentFactory<
      any
    > = this.resolver.resolveComponentFactory(ButtonComponent);

    this.componentRef = this.container.createComponent(factory);

    this.componentRef.instance.data = miteConfig;

    this.componentRef.instance.output.subscribe(event => console.log(event));
  }

  ngOnInit() {
    console.log(JSON.stringify(this.data));
    this.data.forEach(x => {
      this.createComponent(x);
    });
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

  ngAfterContentInit() {}
}
