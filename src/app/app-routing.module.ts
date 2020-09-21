import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { BookingComponent } from "./booking/booking.component";
import { ContactComponent } from "./contact/contact.component";
import { ApartmentsComponent } from "./apartments/apartments.component";
import { EventsComponent } from "./events/events.component";
import { DeleteBookingComponent } from "./delete-booking/delete-booking.component";
import { DeleteUserDataComponent } from "./delete-user-data/delete-user-data.component";
import { SubscribeComponent } from "./subscribe/subscribe.component";
import { HouseRulesComponent } from "./house-rules/house-rules.component";
import { BookingInformationsComponent } from "./booking-informations/booking-informations.component";
import { PrivacyStatementComponent } from "./privacy-statement/privacy-statement.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "booking", component: BookingComponent },
  { path: "contact", component: ContactComponent },
  { path: "apartments", component: ApartmentsComponent },
  { path: "events", component: EventsComponent },
  { path: "delete-booking", component: DeleteBookingComponent },
  { path: "delete-user-data", component: DeleteUserDataComponent },
  { path: "subscribe", component: SubscribeComponent },
  { path: "house-rules", component: HouseRulesComponent },
  { path: "booking-info", component: BookingInformationsComponent },
  { path: "privacy-statement", component: PrivacyStatementComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      onSameUrlNavigation: "reload",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
