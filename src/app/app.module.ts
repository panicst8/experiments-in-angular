import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/modules/material/material.module';

import { AppComponent } from './app.component';
import { DynoComponent } from './shared/components/dyno/dyno.component';
import { ButtonComponent } from './shared/components/dyno/mites/button/button.component';

@NgModule({
  declarations: [AppComponent, DynoComponent, ButtonComponent],
  entryComponents: [ButtonComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MaterialModule],
})
export class AppModule {}
