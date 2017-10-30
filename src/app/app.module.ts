import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/modules/material/material.module';

import { AppComponent } from './app.component';

@NgModule({
   declarations: [AppComponent],
   entryComponents: [],
   imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
   providers: [],
   bootstrap: [AppComponent],
   exports: [MaterialModule],
})
export class AppModule {}
