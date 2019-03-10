import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpConstants } from './http.constants';
import { HttpUtils } from './http.utils';
import { toDate } from '@angular/common/src/i18n/format_date';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaticInformationHttpService {
  private staticData: any = undefined;
  private observable;

  constructor(private http: HttpClient) {}

  public getStaticInformation(): Observable<Object> {
    if (this.staticData) {
      return of(this.staticData);
    }

    this.observable = this.http.get(
      `${HttpConstants.rootUrl}${HttpConstants.staticInformationEndpoint}`
    ).pipe(
    map(response =>  {
      this.observable = null;
      this.staticData = response;

      return this.staticData;
    }));

    return this.observable;
  }
}
