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

  private costData: any = undefined;
  private observable;

  constructor(private http: HttpClient) {}

  public getCostCalculationBetweenDate(fromDate: Date, toDate: Date): Observable<Object> {
    if (this.costData) {
      return of(this.costData);
    }

    this.observable = this.http.get(
      `${HttpConstants.rootUrl}${HttpConstants.costCalculationEndpoint}?fromDate=${HttpUtils.convertArrivalDate(
        fromDate
        )}&toDate=${HttpUtils.convertDepartureDate(
          toDate
          )}`
    ).pipe(
    map(response =>  {
      this.observable = null;
      this.costData = response;

      return this.costData;
    }));

    return this.observable;
  }
}
