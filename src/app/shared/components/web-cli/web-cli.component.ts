import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-web-cli',
  templateUrl: './web-cli.component.html',
  styleUrls: ['./web-cli.component.scss'],
})
export class WebCliComponent implements OnInit {
  @ViewChild('cmdPrompt') cmdPromptElement: ElementRef;
  @ViewChild('cmdPromptOutputDiv') cmdPromptOutputDivElement: ElementRef;

  public cmdOutputHtml = '';

  @Input() consoleActive;

  // This is what allows parent to focus input -- prob see if hide show can trigger this
  @Input()
  set setProp(p: boolean) {
    console.log(p);
    setTimeout(() => {
      this.cmdPromptElement.nativeElement.focus();
    }, 0);
  }

  constructor() {}

  executeCommand(event) {
    console.log('Execute: ', event.target.value);
    // console.log(this.cmdOutputElement.nativeElement); // .innerHtml = `<span>${ event.target.value }</span>`;
    this.cmdOutputHtml += `<br> ${event.target.value}`;
    this.cmdPromptOutputDivElement.nativeElement.scrollTop = this.cmdPromptOutputDivElement.nativeElement.scrollHeight;
  }

  ngOnInit() {}
}
