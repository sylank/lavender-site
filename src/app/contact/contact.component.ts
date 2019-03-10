import { Component, OnInit } from '@angular/core';
import { StaticInformationHttpService } from '../shared/static-information.http.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.pug',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  public showLoading = true;
  public data = {
    contactName: '',
    phone: '',
    email: '',
    address: '',
    bankAccount: ''
  };

  constructor(private staticInfoService: StaticInformationHttpService) { }

  ngOnInit() {
    this.showLoading = true;

    this.staticInfoService.getStaticInformation().subscribe(
      (staticData: any) => {
        console.log(staticData);
        this.data.contactName = staticData.response.contactName;
        this.data.phone = staticData.response.phoneNumber;
        this.data.email = staticData.response.emailAddress;
        this.data.address = staticData.response.address;
        this.data.bankAccount = staticData.response.bankAccountId;

        this.showLoading = false;
      }
    );
  }

}
