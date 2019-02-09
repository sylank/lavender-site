import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpConstants } from './http.constants';
import { HttpUtils } from './http.utils';

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
      }?fromDate=${arrival}&toDate=${departure}&email=aa&body=bb&fullName=cc&phoneNumber=dd`
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
    return this.http.get(
      `${HttpConstants.rootUrl}${
        HttpConstants.calendarQueryEndpoint
      }?fromDate=${fromDate}&toDate=${toDate}&email=aa&body=bb&fullName=cc&phoneNumber=dd`
    );
  }

  public getReservedDates(arrival: Date, departure: Date): Observable<Object> {
    return this.http.get(
      `${HttpConstants.rootUrl}${HttpConstants.calendarQueryEndpoint}?fromDate=${HttpUtils.convertArrivalDate(
        arrival
      )}&toDate=${HttpUtils.convertDepartureDate(
        departure
      )}&email=aa&body=bb&fullName=cc&phoneNumber=dd`
    );
  }

  public submitBooking(): Observable<Object> {
    return this.http.post(`${HttpConstants.rootUrl}`, '123');
  }
}

/* bookingData = {
    "g-recaptcha-response": response,
    email: senderVal,
    body: bodyVal,
    fromDate: encodeURIComponent(fromDateVal),
    toDate: encodeURIComponent(toDateVal),
    fullName: fullNameVal,
    phoneNumber: phoneNumberVal
  }; */
