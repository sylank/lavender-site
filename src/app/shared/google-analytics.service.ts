import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

declare let ga: Function; // Declare ga as a function

@Injectable({
  providedIn: "root"
})
export class GoogleAnalyticsService {
  constructor() {}

  public eventEmitter(
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    if (environment.production) {
      ga("send", "event", {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventAction: eventAction,
        eventValue: eventValue
      });
    }
  }
}
