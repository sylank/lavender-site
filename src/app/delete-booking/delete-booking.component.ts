import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { CustomValidator } from "../shared/validators/email.validator";
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
  public bookingSerial: string = "";
  public showLoading: boolean;

  formName: FormGroup;

  constructor(
    private fb: FormBuilder,
    private calendarHttpService: CalendarHttpService,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit() {
    this.formName = this.fb.group({
      sureField: ["", [Validators.required]]
    });

    this.reCaptchaV3Service.execute(HttpConstants.reCaptchaSiteKey, 'delete-booking', (token) => {
    }, {
        useGlobalDomain: false
    });
  }

  sendingDisabled() {
    return !this.sureCheck || this.formName.invalid;
  }

  onSubmit(form: NgForm): void {
    this.showLoading = true;
    this.reCaptchaV3Service.execute(HttpConstants.reCaptchaSiteKey, 'delete-booking', (token) => {
      this.calendarHttpService.deleteBooking(this.bookingSerial,token).subscribe((deleteResult: any)=> {

        this.showLoading = false;
      });
    }, {
        useGlobalDomain: false
    });

  }
}
