import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { ReCaptchaV3Service } from "ngx-captcha";
import { HttpConstants } from "../shared/http.constants";
import { CustomValidator } from "../shared/validators/email.validator";
import { UserDataHttpService } from "../shared/user-data.http.service";
import { GoogleAnalyticsConstants } from "../shared/google.analytics.constants";
import { GoogleAnalyticsService } from "../shared/google-analytics.service";

@Component({
  selector: "app-delete-user-data",
  templateUrl: "./delete-user-data.component.pug",
  styleUrls: ["./delete-user-data.component.sass"],
})
export class DeleteUserDataComponent implements OnInit {
  public sureCheck: boolean = false;
  public showLoading: boolean;
  public showNotification: boolean;
  public messageLength: number;

  public formName: FormGroup;

  public deletion: any = {
    email: "",
    message: "",
  };

  constructor(
    private fb: FormBuilder,
    private deleteUserDataService: UserDataHttpService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.messageLength = 300;
    this.formName = this.fb.group({
      email: ["", [Validators.required, CustomValidator.emailValidator]],
      message: ["", []],
    });

    this.reCaptchaV3Service.execute(
      HttpConstants.reCaptchaSiteKey,
      "deleteuserdata",
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
      "deleteuserdata",
      (token) => {
        this.deleteUserDataService
          .deleteUserData(this.deletion, token)
          .subscribe(
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
      GoogleAnalyticsConstants.DELETE_USER_SUBMIT_EVENT,
      GoogleAnalyticsConstants.TRUE_ACTION,
      "",
      1
    );
  }

  showNotificationPane() {
    this.showLoading = false;
    this.showNotification = true;
  }

  onMessageInput(): void {
    this.messageLength = 300 - this.formName.get("message").value.length;
  }
}
