import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../shared/google-analytics.service';
import { GoogleAnalyticsConstants } from '../shared/google.analytics.constants';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.pug',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  constructor(private googleAnalyticsService: GoogleAnalyticsService) { }

  public contactInfo = [
    {
      title: 'Kapcsolattartó',
      defaultValue: 'Faházi-Takácsxxx',
      callback : function(data) {
        this.sendToAnalytics(0)
        return data.contactName;
      }
    },
    {
      title: 'Telefon',
      defaultValue: '+3630/482xxxxxxx',
      callback : function(data) {
        this.sendToAnalytics(1)
        return data.phoneNumber;
      }
    },
    {
      title: 'E-mail',
      defaultValue: 'levendula.balatx',
      callback : function(data) {
        this.sendToAnalytics(2)
        return data.emailAddress;
      }
    },
    {
      title: 'Cím',
      defaultValue: 'Magyarország, 86',
      callback : function(data) {
        this.sendToAnalytics(3)
        return data.address;
      }
    },
    {
      title: 'Számlaszám',
      defaultValue: '12345-1212211xxx',
      callback : function(data) {
        this.sendToAnalytics(4)
        return data.bankAccountId;
      }
    }
  ];

  ngOnInit() { }

  sendToAnalytics(actionId: number) {
    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.SHOW_CONTACTS_EVENT,
      GoogleAnalyticsConstants.TRUE_ACTION,
      '',
      actionId)
  }
}
