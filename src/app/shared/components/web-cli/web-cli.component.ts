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
  private validCommands = new Set(['CLS', 'CLEAR', 'ENV', 'IMG', 'VIDEO']);

  private logStyle = function(cmd) {
    return this.validCommands.has(cmd) ? 'cmd' : 'ok';
  };

  constructor(private el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() {
    this.showGreeting();
  }

  readyCommand(event) {
    const command = event.target.value.trim();
    this.cmdOffSet(-42);
    this.cmdPromptControls('clear');
    this.writeLine(command, this.logStyle(command));
    // this.writeLine(command, 'input');

    if (command === '') {
      return;
    }

    this.history.push(command);

    const tokens = this.getArgs(command);

    // const tokens = command.split(' ');
    const cmd = tokens.shift().toUpperCase();
    this.executeCommand(cmd, tokens);
  }

  getArgs(cmdLine) {
    const tokenEx = /[^\s"]+|"[^"]*"/g;
    const quoteEx = /"/g;
    const args = cmdLine.match(tokenEx);

    // Remove any quotes that may be in the args
    for (let i = 0; i < args.length; i++) {
      args[i] = args[i].replace(quoteEx, '');
    }
    return args;
  }

  executeCommand(cmd, tokens) {
    switch (cmd) {
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
    }
  }

  // commands
  CLS() {
    this.cmdPromptOutputDivElement.nativeElement.innerHTML = '';
  }

  IMG() {
    this.writeHTML(
      `<img height='200px' width='250px'
       src="https://ip1gh35mejw4dpqjl4aya71p-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/analytics-meme-sword-guy.png"/>`,
    );
  }

  VIDEO() {
    this.writeHTML(
      `<iframe width="560" height="315" src="https://www.youtube.com/embed/hyC_3HHz13I" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
    );
  }

  ENV() {
    console.log(window);
    this.cmdPromptOutputDivElement.nativeElement.innerHTML = this;
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

    this.cmdPromptElement.nativeElement.value = this.history[
      this.history.length - this.cmdOffSet()
    ];
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
