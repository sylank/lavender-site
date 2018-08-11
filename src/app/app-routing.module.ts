import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { ContactComponent } from './contact/contact.component';
import { PhotosComponent } from './photos/photos.component';
import { EventsComponent } from './events/events.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "booking", component: BookingComponent },
  { path: "contact", component: ContactComponent },
  { path: "photos", component: PhotosComponent },
  { path: "events", component: EventsComponent }
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }