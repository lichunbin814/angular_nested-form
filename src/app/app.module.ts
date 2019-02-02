import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoFormModule } from "src/app/demo-form/demo-form.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DemoFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
