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

  // This is what allows parent to focus input -- prob see if hide show can trigger this
  @Input()
  set setProp(p: boolean) {
    console.log(p);
    setTimeout(() => {
      this.focus();
    }, 0);
  }

  constructor(private el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() {}

  executeCommand(event) {
    this.writeLine(event.target.value);
  }

  focus() {
    this.cmdPromptElement.nativeElement.focus();
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
}
