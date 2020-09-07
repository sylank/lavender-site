import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { CalendarHttpService } from "../shared/calendar.http.service";
import { ReCaptchaV3Service } from "ngx-captcha";
import { HttpConstants } from "../shared/http.constants";
import { GoogleAnalyticsService } from "../shared/google-analytics.service";
import { GoogleAnalyticsConstants } from "../shared/google.analytics.constants";

@Component({
  selector: "app-delete-booking",
  templateUrl: "./delete-booking.component.pug",
  styleUrls: ["./delete-booking.component.sass"],
})
export class DeleteBookingComponent implements OnInit {
  public showLoading: boolean = false;

  public sureCheck: boolean = false;
  public showNotification: boolean;

  public formName: FormGroup;

  public deletion: any = {
    bookingSerial: "",
    message: "",
  };

  constructor(
    private fb: FormBuilder,
    private calendarHttpService: CalendarHttpService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.formName = this.fb.group({
      sureField: ["", [Validators.required]],
      message: ["", []],
    });

    this.reCaptchaV3Service.execute(
      HttpConstants.reCaptchaSiteKey,
      "deletebooking",
      (token) => {},
      {
        useGlobalDomain: false,
      }
    );
  }

  sendingDisabled() {
    return !this.sureCheck || this.formName.invalid;
  }

  onSubmit(): void {
    this.showLoading = true;
    this.reCaptchaV3Service.execute(
      HttpConstants.reCaptchaSiteKey,
      "deletebooking",
      (token) => {
        this.calendarHttpService.deleteBooking(this.deletion, token).subscribe(
          (result) => {
            this.showNotificationPane();
          },
          (error) => {
            this.showNotificationPane();
          },
          () => {
            this.showNotificationPane();
          }
        );
      },
      {
        useGlobalDomain: false,
      }
    );

    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.DELETE_BOOKING_SUBMIT_EVENT,
      GoogleAnalyticsConstants.TRUE_ACTION,
      "",
      1
    );
  }

  showNotificationPane() {
    this.showLoading = false;
    this.showNotification = true;
  }

  getMessageLength(): number {
    return 300 - this.deletion.message.length;
  }
}
