import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {CustomValidator} from './shared/validators/email.validator';

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
import { DayComponent } from './booking/calendar/day/day.component';

import { AgmCoreModule } from '@agm/core';
import { EventComponent } from './events/event/event.component';
import { LoadingCircleComponent } from './shared/loading-circle/loading-circle.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { DataHiderComponent } from './shared/data-hider/data-hider.component';
import { DeleteBookingComponent } from './delete-booking/delete-booking.component';

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
    DayComponent,
    EventComponent,
    LoadingCircleComponent,
    DataHiderComponent,
    DeleteBookingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAUJ5jGs6beGOY_Ts8PSloxQw09IVZfcdw'
    })
  ],
  providers: [GalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
