import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { EventsComponent } from './events/events.component';
import { DeleteBookingComponent } from './delete-booking/delete-booking.component';
import { DeleteUserDataComponent } from './delete-user-data/delete-user-data.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'events', component: EventsComponent },
  { path: 'delete-booking', component: DeleteBookingComponent},
  { path: 'delete-user-data', component: DeleteUserDataComponent},
  { path: 'subscribe', component: SubscribeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
