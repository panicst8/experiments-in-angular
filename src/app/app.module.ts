import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/modules/material/material.module';

import { AppComponent } from './app.component';
import { DynoComponent } from './shared/components/dyno/dyno.component';
import { ButtonComponent } from './shared/components/dyno/mites/button/button.component';
import { WebCliComponent } from './shared/components/web-cli/web-cli.component';

@NgModule({
  declarations: [AppComponent, DynoComponent, ButtonComponent, WebCliComponent],
  entryComponents: [ButtonComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgxsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MaterialModule],
})
export class AppModule {}
