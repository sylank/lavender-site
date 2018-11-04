import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { AutofocusDirective } from './shared/autofocus.directive';
import { GalleryService } from './shared/gallery.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ImageLoaderDirective } from './shared/image-loader.directive';
import { ImageOpacityDirective } from './shared/image-opacity.directive';
import { CalendarComponent } from './booking/calendar/calendar.component';
import { DayFormatterDirective } from './booking/calendar/day-formatter.directive';
import { DayComponent } from './booking/calendar/day/day.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    GalleryComponent,
    EventsComponent,
    ContactComponent,
    BookingComponent,
    FooterComponent,
    AutofocusDirective,
    ImageLoaderDirective,
    ImageOpacityDirective,
    CalendarComponent,
    DayFormatterDirective,
    DayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [GalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
