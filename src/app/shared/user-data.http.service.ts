import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { HttpConstants } from "./http.constants";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserDataHttpService {
  constructor(private http: HttpClient) {}

  public deleteUserData(deleteUserData: any, reCaptchaToken: string): Observable<Object> {
    const postData = {
      "g-recaptcha-response": reCaptchaToken,
      email: deleteUserData.email,
      message: deleteUserData.message
    };
    return this.http.post(
      `${HttpConstants.rootUrl}${HttpConstants.deleteUserDataEndpoint}`,
      postData
    );
  }
}
