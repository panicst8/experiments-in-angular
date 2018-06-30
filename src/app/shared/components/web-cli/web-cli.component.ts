import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-web-cli',
  templateUrl: './web-cli.component.html',
  styleUrls: ['./web-cli.component.scss'],
})
export class WebCliComponent implements OnInit {
  @ViewChild('cmdPrompt') cmdPrompt;
  @Input() consoleActive;

  constructor() {}

  executeCommand(event) {
    console.log('Execute: ', event.target.value);
  }

  ngOnInit() {}
}
