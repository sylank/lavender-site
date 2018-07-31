import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollToModule } from 'ng2-scroll-to-el';

import { AppComponent } from './app.component';
import { RadarAppModule } from '../../node_modules/event-radar-ng/src/app/app.module';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RadarAppModule,
    ScrollToModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCperAMWUZ78vz9PMdFDJcpmnH8p-AAij0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
