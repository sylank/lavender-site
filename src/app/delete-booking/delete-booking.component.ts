import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { CalendarHttpService } from "../shared/calendar.http.service";
import { ReCaptchaV3Service } from 'ngx-captcha';
import { HttpConstants } from '../shared/http.constants';

@Component({
  selector: "app-delete-booking",
  templateUrl: "./delete-booking.component.pug",
  styleUrls: ["./delete-booking.component.sass"]
})
export class DeleteBookingComponent implements OnInit {
  public sureCheck: boolean = false;
  public showLoading: boolean;
  public showNotification:boolean;
  public messageLength: number;

  public formName: FormGroup;

  public deletion :any = {
    bookingSerial: "",
    message:""
  }

  constructor(
    private fb: FormBuilder,
    private calendarHttpService: CalendarHttpService,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit() {
    this.messageLength=300;
    this.formName = this.fb.group({
      sureField: ['', [Validators.required]],
      message: ['', []]
    });

    this.reCaptchaV3Service.execute(HttpConstants.reCaptchaSiteKey, 'deletebooking', (token) => {
    }, {
        useGlobalDomain: false
    });
  }

  sendingDisabled() {
    return !this.sureCheck || this.formName.invalid;
  }

  onSubmit(): void {
    this.showLoading = true;
    this.reCaptchaV3Service.execute(HttpConstants.reCaptchaSiteKey, 'deletebooking', (token) => {
      this.calendarHttpService.deleteBooking(this.deletion,token).subscribe( result => {
        this.showNotificationPane()
      },
      error => {
        this.showNotificationPane()
      },
      () => {
        this.showNotificationPane()
      });
    }, {
        useGlobalDomain: false
    });
  }

  showNotificationPane() {
    this.showLoading = false
    this.showNotification = true
  }

  onMessageInput(): void {
    this.messageLength = 300 - this.formName.get('message').value.length;
  }
}
