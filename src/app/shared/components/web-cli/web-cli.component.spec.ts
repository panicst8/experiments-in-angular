import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCliComponent } from './web-cli.component';

describe('WebCliComponent', () => {
  let component: WebCliComponent;
  let fixture: ComponentFixture<WebCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
