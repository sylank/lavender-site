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
import { HttpClientModule, HttpClientJsonpModule } from '../../node_modules/@angular/common/http';
import { ImageLoaderDirective } from './shared/image-loader.directive';
import { ImageOpacityDirective } from './shared/image-opacity.directive';
import { CalendarComponent } from './booking/calendar/calendar.component';
import { DayComponent } from './booking/calendar/day/day.component';

import { EventComponent } from './events/event/event.component';
import { LoadingCircleComponent } from './shared/loading-circle/loading-circle.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { DataHiderComponent } from './shared/data-hider/data-hider.component';
import { DeleteBookingComponent } from './delete-booking/delete-booking.component';
import { DeleteUserDataComponent } from './delete-user-data/delete-user-data.component';
import { NumberChooserComponent } from './shared/number-chooser/number-chooser.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { TranslateDirective } from './shared/translate.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    DeleteBookingComponent,
    DeleteUserDataComponent,
    NumberChooserComponent,
    SubscribeComponent,
    TranslateDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
  ],
  providers: [GalleryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
