import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpConstants } from './http.constants';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpUtils } from './http.utils';

@Injectable({
  providedIn: 'root'
})
export class CostCalculationHttpService {

  constructor(private http: HttpClient) {}

  public getCostCalculationBetweenDate(fromDate: Date, toDate: Date): Observable<Object> {
    return this.http.get(
      `${HttpConstants.rootUrl}${HttpConstants.costCalculationEndpoint}?fromDate=${HttpUtils.convertArrivalDate(
        fromDate
        )}&toDate=${HttpUtils.convertDepartureDate(
          toDate
          )}`
    );
  }
}
