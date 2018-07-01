import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-web-cli',
  templateUrl: './web-cli.component.html',
  styleUrls: ['./web-cli.component.scss'],
})
export class WebCliComponent implements OnInit {
  @ViewChild('cmdPrompt') cmdPromptElement: ElementRef;
  @ViewChild('cmdPromptOutputDiv') cmdPromptOutputDivElement: ElementRef;
  @Input() consoleActive;
  @Input()
  set setProp(p: boolean) {
    console.log(p);
    setTimeout(() => {
      this.cmdPromptControls('focus');
    }, 0);
  }

  private history = [];
  public cmdOffSet = (function() {
    let offset = 0;
    return function(adjustment = 0) {
      if (adjustment === -42) {
        offset = 0;
      } else {
        offset += adjustment;
      }
      return offset;
    };
  })();

  constructor(private el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() {
    this.showGreeting();
  }

  executeCommand(event) {
    const command = event.target.value.trim();
    // this.writeHTML('<p>Boom!</p>');
    this.cmdOffSet(-42);
    this.cmdPromptControls('clear');
    this.writeLine(command, 'cmd');
    if (!command) {
      return;
    }
    this.history.push(command);
  }

  browseHistory(adjustment) {
    this.cmdOffSet(adjustment);
    if (this.cmdOffSet() === 5) {
      this.cmdOffSet();
    }
    console.log(this.cmdOffSet());
  }

  cmdPromptControls(action) {
    switch (action) {
      case 'focus':
        this.cmdPromptElement.nativeElement.focus();
        break;
      case 'clear':
        this.cmdPromptElement.nativeElement.value = '';
        break;
    }
  }

  scrollToBottom() {
    this.cmdPromptOutputDivElement.nativeElement.scrollTop = this.cmdPromptOutputDivElement.nativeElement.scrollHeight;
  }

  newLine() {
    const newLine = document.createElement('br');
    this.cmdPromptOutputDivElement.nativeElement.appendChild(newLine);
  }

  writeLine(txt, cssSuffix = 'ok') {
    const span = document.createElement('span');
    span.className = `webCli-${cssSuffix}`;
    span.innerText = txt;
    this.cmdPromptOutputDivElement.nativeElement.appendChild(span);
    this.newLine();
  }

  writeHTML(markUp) {
    const div = document.createElement('div');
    div.innerHTML = markUp;
    this.cmdPromptOutputDivElement.nativeElement.appendChild(div);
    this.newLine();
  }

  showGreeting() {
    this.writeLine('Web CLI [Version 0.0.1]', 'cmd');
    this.newLine();
  }
}
