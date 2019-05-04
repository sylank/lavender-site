import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { HttpConstants } from '../shared/http.constants';
import { CustomValidator } from '../shared/validators/email.validator';
import { UserDataHttpService } from '../shared/user-data.http.service';

@Component({
  selector: 'app-delete-user-data',
  templateUrl: './delete-user-data.component.pug',
  styleUrls: ['./delete-user-data.component.sass']
})
export class DeleteUserDataComponent implements OnInit {
  public sureCheck: boolean = false;
  public email: string = "";
  public showLoading: boolean;
  public showNotification:boolean;

  formName: FormGroup;
  constructor(
    private fb: FormBuilder,
    private deleteUserDataService: UserDataHttpService,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) { }

  ngOnInit() {
    this.formName = this.fb.group({
      email: ['', [Validators.required, CustomValidator.emailValidator]],
    });

    this.reCaptchaV3Service.execute(HttpConstants.reCaptchaSiteKey, 'delete-user-data', (token) => {
    }, {
        useGlobalDomain: false
    });
  }

  sendingDisabled() {
    return !this.sureCheck || this.formName.invalid;
  }

  onSubmit(form: NgForm): void {
    this.showLoading = true;
    this.showNotification = false;
    this.reCaptchaV3Service.execute(HttpConstants.reCaptchaSiteKey, 'delete-user-data', (token) => {
      this.deleteUserDataService.deleteUserData(this.email, token).subscribe((deleteResponse: any)=>{
        this.showLoading = false;
        this.showLoading = true;
      });
    }, {
        useGlobalDomain: false
    });
  }

}
