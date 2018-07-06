import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RadarAppModule } from '../../node_modules/event-radar-ng/src/app/app.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RadarAppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
