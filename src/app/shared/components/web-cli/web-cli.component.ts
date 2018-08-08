import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  Host,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import * as _ from 'lodash';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-web-cli',
  templateUrl: './web-cli.component.html',
  styleUrls: ['./web-cli.component.scss'],
  animations: [
    trigger('changeState', [
      state(
        'state1',
        style({
          height: '300px',
          // opacity: 0,
          // backgroundColor: 'green',
          // transform: 'scale(-1)',
        })
      ),
      state(
        'state2',
        style({
          height: '0px',
          // opacity: 1,
          // backgroundColor: 'red',
          // transform: 'scale(1)',
        })
      ),
      transition('*=>state1', animate('100ms')),
      transition('*=>state2', animate('100ms')),
    ]),
  ],
})
export class WebCliComponent implements OnInit {
  @ViewChild('cmdPrompt') cmdPromptElement: ElementRef;
  @ViewChild('cmdPromptOutputDiv') cmdPromptOutputDivElement: ElementRef;
  @ViewChild('fakeInput') fakeInput: ElementRef;
  @Input()
  set setProp(p: boolean) {
    setTimeout(() => {
      this.cmdPromptControls('focus');
    }, 0);
  }

  @Input() webCliState$;

  public currentState = 'state2';

  private history = [];
  public cmdOffSet = (function() {
    let offset = 0;
    return function(adjustment = 0) {
      console.log(offset);
      if (adjustment === -42) {
        offset = 0;
      } else {
        offset += adjustment;
      }
      return offset;
    };
  })();
  private validCommands = new Set(['CLS', 'CLEAR', 'ENV', 'IMG', 'VIDEO']);

  private logStyle = function(cmd) {
    return this.validCommands.has(cmd.toUpperCase()) ? 'cmd' : 'ok';
  };

  constructor(
    @Host() parent: AppComponent,
    private el: ElementRef,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    this.showGreeting();
    this.webCliState$.subscribe((curState) => {
      if (curState === 1) {
        this.cmdPromptControls('focus');
      }
      this.currentState = 'state' + curState;
      console.log('state value: ', curState);
    });
  }

  toggleState() {
    if (this.currentState === 'state1') {
      this.currentState = 'state2';
    } else {
      this.currentState = 'state1';
    }
  }

  otherKey(keyPress: KeyboardEvent) {
    if (keyPress.key === 'ArrowUp') {
      keyPress.preventDefault();
      this.browseHistory(+1);
    } else if (keyPress.key === 'ArrowDown') {
      keyPress.preventDefault();
      this.browseHistory(-1);
    } else {
      // console.log(keyPress.key);
    }

    if (
      keyPress.key === 'Alt' ||
      keyPress.key === 'Control' ||
      keyPress.altKey ||
      keyPress.ctrlKey
    ) {
      return false;
    }

    if (keyPress.key === 'Enter') {
      this.readyCommand(this.fakeInput.nativeElement.innerText);
    } else if (keyPress.key === 'Backspace') {
      this.fakeInput.nativeElement.innerText = this.fakeInput.nativeElement.innerText.slice(
        0,
        -1
      );
    } else if (this.validKey(keyPress.keyCode)) {
      this.fakeInput.nativeElement.innerText =
        this.fakeInput.nativeElement.innerText + keyPress.key;
    } else {
      // console.log('other key: ', keyPress, keyPress.key);
    }
  }

  validKey(keyCode: number) {
    const isValid =
      (keyCode > 47 && keyCode < 58) || // number keys
      keyCode === 32 ||
      keyCode === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
      (keyCode > 64 && keyCode < 91) || // letter keys
      (keyCode > 95 && keyCode < 112) || // numpad keys
      (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
      (keyCode > 218 && keyCode < 223); // [\]' (in order)
    return isValid;
  }

  readyCommand(command: string) {
    command = String(command).trim();

    if (command === '') {
      this.cmdPromptOutputDivElement.nativeElement.appendChild(
        this.promptCopy('')
      );
      this.newLine();
      return;
    }

    this.cmdOffSet(-42);
    this.cmdPromptControls('clear');
    this.writeLine(command, null, true);

    if (command === '') {
      this.cmdPromptOutputDivElement.nativeElement.appendChild(
        this.promptCopy('')
      );
      return;
    }

    this.fakeInput.nativeElement.innerText = '';

    if (_.last(this.history) !== command) {
      this.history.push(command);
    }

    const tokens = this.getArgs(command);

    const cmd = tokens.shift();
    this.executeCommand(cmd, tokens);
  }

  getArgs(cmdLine: string) {
    const tokenEx = /[^\s"]+|"[^"]*"/g;
    const quoteEx = /"/g;
    const args = String(cmdLine).match(tokenEx);

    // Remove any quotes that may be in the args
    for (let i = 0; i < args.length; i++) {
      args[i] = args[i].replace(quoteEx, '');
    }
    return args;
  }

  executeCommand(cmd, tokens) {
    switch (cmd.toUpperCase()) {
      case 'CLS':
      case 'CLEAR':
        this.CLS();
        break;
      case 'ENV':
        this.ENV();
        break;
      case 'IMG':
        this.IMG();
        break;
      case 'VIDEO':
        this.VIDEO();
        break;
      default:
        this.writeLine(`command not found: ${cmd}`, 'error');
    }
  }

  // commands
  CLS() {
    this.cmdPromptOutputDivElement.nativeElement.innerHTML = '';
  }

  IMG() {
    this.writeHTML(
      `<br><img height='200px' width='250px'
       src="https://ip1gh35mejw4dpqjl4aya71p-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/analytics-meme-sword-guy.png"/>`
    );
  }

  VIDEO() {
    this.writeHTML(`<br><iframe width="200" height="200"
     src="https://www.youtube-nocookie.com/embed/hyC_3HHz13I?rel=0&amp&controls=0&showinfo=0&modestbranding=1&showinfo=0&rel=0"
    frameborder="0" allow="autoplay; encrypted-media"
     ></iframe>`);
  }

  ENV() {
    // this.cmdPromptOutputDivElement.nativeElement.innerHTML = this;
    console.log('this: ', this);
  }

  browseHistory(adjustment) {
    if (adjustment + this.cmdOffSet() === 0) {
      this.cmdOffSet(adjustment);
      this.cmdPromptControls('clear');
      return;
    } else if (this.cmdOffSet() + adjustment > this.history.length) {
      return;
    } else if (this.cmdOffSet() + adjustment < 1) {
      this.cmdPromptControls('clear');
      return;
    }

    this.cmdOffSet(adjustment);

    this.fakeInput.nativeElement.innerText = this.history[
      this.history.length - this.cmdOffSet()
    ];
  }

  cmdPromptControls(action) {
    switch (action) {
      case 'focus':
        setTimeout(() => this.cmdPromptElement.nativeElement.focus(), 0);
        break;
      case 'clear':
        this.fakeInput.nativeElement.innerText = '';
        break;
    }
  }

  scrollToBottom() {
    this.cmdPromptElement.nativeElement.scrollTop = this.cmdPromptElement.nativeElement.scrollHeight;
  }

  newLine() {
    const newLine = document.createElement('br');
    this.cmdPromptOutputDivElement.nativeElement.appendChild(newLine);
    this.scrollToBottom();
  }

  promptCopy(cmd: string) {
    const span = document.createElement('span');
    const spanWrapper = document.createElement('span');
    spanWrapper.className = `PROMPT1`;
    spanWrapper.innerHTML = '$ ';
    span.className = 'webCli-span';
    span.innerText = cmd;
    spanWrapper.appendChild(span);
    return spanWrapper;
  }

  writeLine(
    txt,
    cssSuffix: string = 'ok',
    isoldCommandPrompt: boolean = false
  ) {
    const span = document.createElement('span');
    span.innerText = txt;

    if (isoldCommandPrompt) {
      this.cmdPromptOutputDivElement.nativeElement.appendChild(
        this.promptCopy(txt)
      );
    } else if (cssSuffix === 'error') {
      const spanWrapper = document.createElement('span');
      spanWrapper.className = `webCli-red`;
      spanWrapper.innerHTML = 'webCli: ';
      spanWrapper.appendChild(span);
      span.className = `webCli-${cssSuffix}`;
      this.cmdPromptOutputDivElement.nativeElement.appendChild(spanWrapper);
    } else {
      span.className = `webCli-${cssSuffix}`;
      this.cmdPromptOutputDivElement.nativeElement.appendChild(span);
    }
    this.newLine();
  }

  writeHTML(markUp) {
    const div = document.createElement('div');
    div.innerHTML = markUp;
    this.cmdPromptOutputDivElement.nativeElement.appendChild(div);
    this.newLine();
  }

  showGreeting() {
    this.writeLine('Web CLI [Version 0.0.1]', 'version');
    this.newLine();
  }
}
