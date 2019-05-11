import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpConstants } from './http.constants';
import { HttpUtils } from './http.utils';
import { BookingData } from '../booking/booking.data';

@Injectable({
  providedIn: 'root'
})
export class CalendarHttpService {
  constructor(private http: HttpClient) {}

  public checkAvailability(
    arrival: string,
    departure: string
  ): Observable<Object> {
    return this.http.get(
      `${HttpConstants.rootUrl}${
        HttpConstants.calendarEnabledEndpoint
      }?fromDate=${arrival}&toDate=${departure}`
    );
  }

  public checkAvailabilityInMonth(
    year: number,
    month: number
  ): Observable<Object> {
    const daysInMonth: number = 32 - new Date(year, month, 32).getDate();
    const fromDate = HttpUtils.convertArrivalDate(new Date(year, month, 1));
    const toDate = HttpUtils.convertDepartureDate(
      new Date(year, month, daysInMonth)
    );
    console.log("fromDate: "+fromDate+" toDate: "+toDate)
    return this.http.get(
      `${HttpConstants.rootUrl}${
        HttpConstants.calendarQueryEndpoint
      }?fromDate=${fromDate}&toDate=${toDate}`
    );
  }

  public getReservedDates(arrival: Date, departure: Date): Observable<Object> {
    return this.http.get(
      `${HttpConstants.rootUrl}${HttpConstants.calendarQueryEndpoint}?fromDate=${HttpUtils.convertArrivalDate(
        arrival
      )}&toDate=${HttpUtils.convertDepartureDate(
        departure
      )}`
    );
  }

  public submitBooking(bookingData: BookingData, reCaptchaToken: string): Observable<Object> {
    // transform
    const postData = {
      'g-recaptcha-response': reCaptchaToken,
      email: bookingData.email,
      body: bookingData.body,
      fromDate: HttpUtils.convertArrivalDate(bookingData.fromDate),
      toDate: HttpUtils.convertDepartureDate(bookingData.toDate),
      fullName: bookingData.fullName,
      phoneNumber: bookingData.phoneNumber,
      costValue: -1,
      depositCost: -1,
      reservationId: '-',
      subscribe: bookingData.subscribe
    };
    return this.http.post(`${HttpConstants.rootUrl}${HttpConstants.calendarCreateReservationEndpoint}`, postData);
  }

  public deleteBooking(deletionData: any, reCaptchaToken: string) : Observable<Object> {
    const postData = {
      'g-recaptcha-response': reCaptchaToken,
      reservationId:deletionData.bookingSerial,
      deletionMessage: deletionData.message
    };
    return this.http.post(`${HttpConstants.rootUrl}${HttpConstants.calendarDeleteReservationEndpoint}`, postData);
  }
}
