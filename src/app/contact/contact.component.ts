import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.pug',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  constructor() { }

  public contactInfo = [
    {
      title: 'Kapcsolattartó',
      defaultValue: 'Faházi-Takácsxxx',
      callback : function(data) {
        return data.contactName;
      }
    },
    {
      title: 'Telefon',
      defaultValue: '+3630/482xxxxxxx',
      callback : function(data) {
        return data.phoneNumber;
      }
    },
    {
      title: 'E-mail',
      defaultValue: 'levendula.balatx',
      callback : function(data) {
        return data.emailAddress;
      }
    },
    {
      title: 'Cím',
      defaultValue: 'Magyarország, 86',
      callback : function(data) {
        return data.address;
      }
    },
    {
      title: 'Számlaszám',
      defaultValue: '12345-1212211xxx',
      callback : function(data) {
        return data.bankAccountId;
      }
    }
  ];

  ngOnInit() { }

}
