import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SubscriptionModel } from '../subscribe/subscription-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailChimpService {
  private static accountId = 'b3c0ca09a4a428d6a926364eb'
  private static lavenderId = '3a7d54c8ff'
  private static postUrl = 'https://us20.list-manage.com/subscribe/post';

  constructor(private http: HttpClient) {}

  public submitSubscription(subscriptionData: SubscriptionModel): Observable<Object> {
    const mailChimpUrl = `${MailChimpService.postUrl}?u=${MailChimpService.accountId}&id=${MailChimpService.lavenderId}&EMAIL=${subscriptionData.email}&FNAME=${subscriptionData.firstName}&LNAME=${subscriptionData.lastName}`
    return  this.http.jsonp<any>(mailChimpUrl, 'c')
  }
}
