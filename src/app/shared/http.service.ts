import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private rootURL: string = "https://tt7zanf4i3.execute-api.eu-central-1.amazonaws.com/api";
  private queryURL: string = "/reservation/query";
  private enabledURL: string = "/reservation/enabled";

  public checkAvailability(arrival: string, departure: string): Observable<Object> {
    return this.http.get(`${this.rootURL}${this.enabledURL}?fromDate=${arrival}&toDate=${departure}&email=aa&body=bb&fullName=cc&phoneNumber=dd`);
  }

  public checkAvailabilityInMonth(year: number, month: number): Observable<Object> {
    const daysInMonth: number = 32 - new Date(year, month, 32).getDate();
    const fromDate = this.convertArrivalDate(new Date(year, month, 1));
    const toDate = this.convertDepartureDate(new Date(year, month, daysInMonth));
    return this.http.get(`${this.rootURL}${this.queryURL}?fromDate=${fromDate}&toDate=${toDate}&email=aa&body=bb&fullName=cc&phoneNumber=dd`);
  }

  public getReservedDates(arrival: Date, departure: Date): Observable<Object> {
    return this.http.get(`${this.rootURL}${this.queryURL}?fromDate=${this.convertArrivalDate(arrival)}&toDate=${this.convertDepartureDate(departure)}&email=aa&body=bb&fullName=cc&phoneNumber=dd`);
  }

  public submitBooking(): Observable<Object> {
    return this.http.post(`${this.rootURL}`, "123");
  }



  private dateFormat(date: Date): string {
    let month: number | string = date.getMonth() + 1;
    let day: number | string = date.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${date.getFullYear()}-${month}-${day}`;
  }

  private convertArrivalDate(date: Date): string {
    return encodeURIComponent(`${this.dateFormat(date)}T00:00:01+01:00`);
  }

  private convertDepartureDate(date: Date): string {
    return encodeURIComponent(`${this.dateFormat(date)}T23:59:59+01:00`);
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