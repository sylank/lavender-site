import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpConstants } from './http.constants';
import { HttpUtils } from './http.utils';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventHttpService {
  private eventData: any = undefined;
  private observable;

  constructor(private http: HttpClient) {}

  getEventsByFromDateAndToDate(fromDate: Date, toDate: Date, maxDistanceInKm: number): Observable<Object> {
    if (this.eventData) {
      return of(this.eventData);
    }

    this.observable = this.http.get(
      `${HttpConstants.rootUrl}${HttpConstants.eventQueryEndpoint}?fromDate=${HttpUtils.convertArrivalDate(
        fromDate
      )}&toDate=${HttpUtils.convertDepartureDate(
        toDate
      )}&maxDistanceInKm=${maxDistanceInKm}`
    ).pipe(
      map(response =>  {
        this.observable = null;
        this.eventData = response;

        return this.eventData;
      }));

    return this.observable;
  }
}
