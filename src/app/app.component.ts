import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  ButtonColors,
  ButtonTypes,
} from './shared/components/dyno/mites/button/button.enum';
import { ButtonInterface } from './shared/components/dyno/mites/button/button.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('webCli') webCli: ElementRef;
  myButtons: ButtonInterface[];
  results = '';
  public consoleActive = false;
  focusInput: EventEmitter<boolean> = new EventEmitter();

  public webCliState$ = new Subject();

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (event.ctrlKey && event.altKey && event.keyCode === 220) {
      this.consoleActive = !this.consoleActive;
      if (this.consoleActive) {
        this.webCliState$.next(1);
      } else {
        this.webCliState$.next(2);
      }
    }
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http.get('http://localhost:3000/myData').subscribe((data) => {
    // console.log(data);
    // });

    this.myButtons = [
      {
        buttonType: ButtonTypes.toggle,
        isVertical: true,
        buttons: [
          {
            text: 'Left',
            textPosition: 'center',
            value: 'left',
            buttonType: ButtonTypes.child,
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_LEFT',
            debounceTime: 0,
          },
          {
            text: 'Center',
            textPosition: 'center',
            value: 'center',
            buttonType: ButtonTypes.child,
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_CENTER',
            debounceTime: 0,
          },
          {
            text: 'Right',
            textPosition: 'center',
            value: 'right',
            buttonType: ButtonTypes.child,
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_RIGHT',
            debounceTime: 0,
          },
          {
            text: 'Justify',
            textPosition: 'center',
            value: 'justify',
            buttonType: ButtonTypes.child,
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_JUSTIFY',
            debounceTime: 0,
          },
        ],
      },
      {
        buttonType: ButtonTypes.toggle,
        isVertical: false,
        buttons: [
          {
            value: 'left',
            icon: {
              name: 'format_align_left',
            },
            buttonType: ButtonTypes.child,
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_LEFT',
            debounceTime: 0,
          },
          {
            value: 'center',
            icon: {
              name: 'format_align_center',
            },
            buttonType: ButtonTypes.child,
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_CENTER',
            debounceTime: 0,
          },
          {
            value: 'right',
            icon: {
              name: 'format_align_right',
            },
            buttonType: ButtonTypes.child,
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_RIGHT',
            debounceTime: 0,
          },
          {
            value: 'justify',
            icon: {
              name: 'format_align_justify',
            },
            buttonType: ButtonTypes.child,
            action: 'DISPATCH',
            payload: 'FORMAT_ALIGN_JUSTIFY',
            debounceTime: 0,
          },
        ],
      },
      {
        name: 'change_history',
        buttonType: ButtonTypes.miniFab,
        action: 'Do the thing.',
        buttonColor: ButtonColors.primary,
        debounceTime: 0,
      },
      {
        name: 'watch_later',
        buttonType: ButtonTypes.iconButton,
        buttonColor: ButtonColors.accent,
        action: 'Do the thing.',
        debounceTime: 0,
      },
      {
        name: 'home',
        buttonType: ButtonTypes.fab,
        buttonColor: ButtonColors.primary,
        action: 'go home?',
        debounceTime: 200,
      },
      {
        name: 'cloud_download',
        buttonType: ButtonTypes.fab,
        buttonColor: ButtonColors.primary,
        action: 'go home?',
        buttonDisabled: true,
        debounceTime: 200,
      },
      {
        name: '3d_rotation',
        buttonType: ButtonTypes.raised,
        buttonColor: ButtonColors.warn,
        action: 'flippity do',
        debounceTime: 1000,
      },
      {
        name: 'help',
        buttonType: ButtonTypes.basic,
        buttonColor: ButtonColors.warn,
        action: 'get help.',
        debounceTime: 2000,
      },
    ];
  }
}
