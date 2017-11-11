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
import { ButtonInterface } from './shared/components/dyno/mites/button/button.interface';
// import { ButtonTypes, ButtonColors, IconConfig, } from './shared/components/dyno/mites/button/button.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  myButtons: ButtonInterface[];

  ngOnInit() {
    this.myButtons = [
      {
        buttonType: 'toggle',
        isVertical: false,
        buttons: [
          {
            text: 'Left',
            textPosition: 'center',
            value: 'left',
            buttonType: 'child',
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_LEFT',
            debounceTime: 0,
          },
          {
            text: 'Center',
            textPosition: 'center',
            value: 'center',
            buttonType: 'child',
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_CENTER',
            debounceTime: 0,
          },
          {
            text: 'Right',
            textPosition: 'center',
            value: 'right',
            buttonType: 'child',
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_RIGHT',
            debounceTime: 0,
          },
          {
            text: 'Justify',
            textPosition: 'center',
            value: 'justify',
            buttonType: 'child',
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_JUSTIFY',
            debounceTime: 0,
          },
        ],
      },
      {
        buttonType: 'toggle',
        isVertical: true,
        buttons: [
          {
            value: 'left',
            icon: {
              name: 'format_align_left',
            },
            buttonType: 'child',
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_LEFT',
            debounceTime: 0,
          },
          {
            value: 'center',
            icon: {
              name: 'format_align_center',
            },
            buttonType: 'child',
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_CENTER',
            debounceTime: 0,
          },
          {
            value: 'right',
            icon: {
              name: 'format_align_right',
            },
            buttonType: 'child',
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_RIGHT',
            debounceTime: 0,
          },
          {
            value: 'justify',
            icon: {
              name: 'format_align_justify',
            },
            buttonType: 'child',
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_JUSTIFY',
            debounceTime: 0,
          },
        ],
      },
      {
        name: 'change_history',
        buttonType: 'miniFab', // ButtonTypes.miniFab,
        action: 'Do the thing.',
        buttonColor: 'primary', // ButtonColors.primary,
        debounceTime: 0,
      },
      {
        name: 'watch_later',
        buttonType: 'iconButton',
        buttonColor: 'accent',
        action: 'Do the thing.',
        debounceTime: 0,
      },
      {
        name: 'home',
        buttonColor: 'primary',
        buttonType: 'fab',
        action: 'go home?',
        debounceTime: 200,
      },
      {
        name: 'cloud_download',
        buttonColor: 'primary',
        buttonType: 'fab',
        action: 'go home?',
        buttonDisabled: true,
        debounceTime: 200,
      },
      {
        name: '3d_rotation',
        buttonType: 'raised',
        buttonColor: 'warn',
        action: 'flippity do',
        debounceTime: 1000,
      },
      {
        name: 'help',
        buttonType: 'basic',
        buttonColor: 'warn',
        action: 'get help.',
        debounceTime: 2000,
      },
    ];
  }
}
