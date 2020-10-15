import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpConstants } from "./http.constants";
import { HttpUtils } from "./http.utils";
import { BookingData } from "../booking/booking.data";

@Injectable({
  providedIn: "root",
})
export class CalendarHttpService {
  constructor(private http: HttpClient) {}

  public checkAvailabilityInMonth(
    year: number,
    month: number,
    apartmentPrefix: "lavender1" | "lavender2"
  ): Observable<Object> {
    const daysInMonth: number = 32 - new Date(year, month, 32).getDate();
    const fromDate = HttpUtils.convertArrivalDate(new Date(year, month, 1));
    const toDate = HttpUtils.convertDepartureDate(
      new Date(year, month, daysInMonth)
    );

    const apiEndpoint =
      apartmentPrefix == "lavender1"
        ? HttpConstants.lavender1CalendarQueryEndpoint
        : HttpConstants.lavender2CalendarQueryEndpoint;

    return this.http.get(
      `${HttpConstants.rootUrl}${apiEndpoint}?fromDate=${fromDate}&toDate=${toDate}`
    );
  }

  public getReservedDates(
    arrival: Date,
    departure: Date,
    apartmentPrefix: "lavender1" | "lavender2"
  ): Observable<Object> {
    const apiEndpoint =
      apartmentPrefix == "lavender1"
        ? HttpConstants.lavender1CalendarQueryEndpoint
        : HttpConstants.lavender2CalendarQueryEndpoint;

    return this.http.get(
      `${
        HttpConstants.rootUrl
      }${apiEndpoint}?fromDate=${HttpUtils.convertArrivalDate(
        arrival
      )}&toDate=${HttpUtils.convertDepartureDate(departure)}`
    );
  }

  public submitBooking(
    bookingData: BookingData,
    reCaptchaToken: string,
    apartmentPrefix: "lavender1" | "lavender2"
  ): Observable<Object> {
    const postData = {
      "g-recaptcha-response": reCaptchaToken,
      email: bookingData.email,
      body: bookingData.body,
      fromDate: HttpUtils.convertArrivalDate(bookingData.fromDate),
      toDate: HttpUtils.convertDepartureDate(bookingData.toDate),
      fullName: bookingData.lname + " " + bookingData.fname,
      phoneNumber: bookingData.phoneNumber,
      subscribe: bookingData.subscribe,
      personCount: bookingData.personCount + 1,
      petCount: bookingData.petCount,
    };

    const apiEndpoint =
      apartmentPrefix == "lavender1"
        ? HttpConstants.lavender1CalendarCreateReservationEndpoint
        : HttpConstants.lavender2CalendarCreateReservationEndpoint;

    return this.http.post(`${HttpConstants.rootUrl}${apiEndpoint}`, postData);
  }

  public deleteBooking(
    deletionData: any,
    reCaptchaToken: string
  ): Observable<Object> {
    const postData = {
      "g-recaptcha-response": reCaptchaToken,
      reservationId: deletionData.bookingSerial,
      deletionMessage: deletionData.message,
    };
    return this.http.post(
      `${HttpConstants.rootUrl}${HttpConstants.calendarDeleteReservationEndpoint}`,
      postData
    );
  }
}
