import { Component, OnInit } from "@angular/core";
import { GoogleAnalyticsService } from "../shared/google-analytics.service";
import { GoogleAnalyticsConstants } from "../shared/google.analytics.constants";
import { LanguageService } from '../shared/language.service';

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.pug",
  styleUrls: ["./contact.component.sass"]
})
export class ContactComponent implements OnInit {
  public contactInfo = [];

  constructor(googleAnalyticsService: GoogleAnalyticsService, languageService: LanguageService) {
    this.contactInfo = [
      {
        title: "Kapcsolattartó",
        defaultValue: "Faházi-Takácsxxx",
        callback: function(data) {
          googleAnalyticsService.eventEmitter(
            GoogleAnalyticsConstants.SHOW_CONTACTS_EVENT,
            GoogleAnalyticsConstants.TRUE_ACTION,
            "",
            0
          );

          return data.contactName;
        }
      },
      {
        title: "Telefon",
        defaultValue: "+3630/482xxxxxxx",
        callback: function(data) {
          googleAnalyticsService.eventEmitter(
            GoogleAnalyticsConstants.SHOW_CONTACTS_EVENT,
            GoogleAnalyticsConstants.TRUE_ACTION,
            "",
            1
          );
          return data.phoneNumber;
        }
      },
      {
        title: "E-mail",
        defaultValue: "levendula.balatx",
        callback: function(data) {
          googleAnalyticsService.eventEmitter(
            GoogleAnalyticsConstants.SHOW_CONTACTS_EVENT,
            GoogleAnalyticsConstants.TRUE_ACTION,
            "",
            2
          );
          return data.emailAddress;
        }
      },
      {
        title: "Cím",
        defaultValue: "Magyarország, 86",
        callback: function(data) {
          googleAnalyticsService.eventEmitter(
            GoogleAnalyticsConstants.SHOW_CONTACTS_EVENT,
            GoogleAnalyticsConstants.TRUE_ACTION,
            "",
            3
          );
          return data.address;
        }
      }
    ];

    //translate
    languageService.getTranslation().subscribe((translations: any) => {
      this.contactInfo[0].title = translations["contacts"].contact_person
      this.contactInfo[1].title = translations["contacts"].phone
      this.contactInfo[2].title = translations["contacts"].email
      this.contactInfo[3].title = translations["contacts"].address
    })
  }

  ngOnInit() {}
}
