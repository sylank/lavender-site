import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpConstants } from './http.constants';
import { HttpUtils } from './http.utils';

@Injectable({
  providedIn: 'root'
})
export class EventHttpService {
  constructor(private http: HttpClient) {}

  getEventsByFromDateAndToDate(fromDate: Date, toDate: Date, maxDistanceInKm: number): Observable<Object> {
    return this.http.get(
      `${HttpConstants.rootUrl}${HttpConstants.eventQueryEndpoint}?fromDate=${HttpUtils.convertArrivalDate(
        fromDate
      )}&toDate=${HttpUtils.convertDepartureDate(
        toDate
      )}&maxDistanceInKm=${maxDistanceInKm}`
    );
  }
}
