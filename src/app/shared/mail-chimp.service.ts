import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubscriptionModel } from '../subscribe/subscription-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailChimpService {
  private static accountId = 'b3c0ca09a4a428d6a926364eb'
  private static lavenderId = '3a7d54c8ff'
  private static postUrl = 'https://gmail.us20.list-manage.com/subscribe/post';

  constructor(private http: HttpClient) {}

  public submitSubscription(bookingData: SubscriptionModel): Observable<Object> {
    const postData = {
      EMAIL: bookingData.email,
      FNAME: bookingData.firstName,
      LNAME: bookingData.lastName
    }

    return this.http.post(`${MailChimpService.postUrl}?u=${MailChimpService.accountId}&id=${MailChimpService.lavenderId}`, postData);
   }
}
