import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { PhotosComponent } from './photos/photos.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';
import { AppRoutingModule } from './app-routing.module';
import { ScrollDirective } from './navbar/scroll.directive';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    IntroComponent,
    PhotosComponent,
    EventsComponent,
    ContactComponent,
    BookingComponent,
    ScrollDirective,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
