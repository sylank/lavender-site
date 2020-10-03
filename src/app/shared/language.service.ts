import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { parse } from "yamljs";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private languageFiles = {
    hu: "../../assets/lng/hu.yaml",
    en: "../../assets/lng/en.yaml",
  };

  private translations = {
    hu: {},
    en: {},
  };

  private selectedLanguage: string;
  private _languageSource: BehaviorSubject<string>;
  private languageItem$: Observable<string>;
  private observable;

  constructor(private http: HttpClient) {
    this.selectLanguage(this.detectLanguage());

    this._languageSource = new BehaviorSubject<string>(this.selectedLanguage);
    this.languageItem$ = this._languageSource.asObservable();
  }

  public getTranslation(): Observable<Object> {
    const obj = this.translations[this.selectedLanguage];

    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      this.observable = this.http
        .get(this.languageFiles[this.selectedLanguage], {
          observe: "body",
          responseType: "text", // This one here tells HttpClient to parse it as text, not as JSON
        })
        .pipe(
          map((response) => {
            this.observable = null;
            const jsonObject = parse(response);
            this.translations[this.selectedLanguage] = jsonObject;

            return this.translations[this.selectedLanguage];
          })
        );

      return this.observable;
    } else {
      return of(obj);
    }
  }

  public getValueByKey(key: string, obj: any) {
    const pathElements = key.split(".");
    return pathElements.reduce((o, n) => o[n], obj);
  }

  public setLanguage(language: string) {
    this.selectLanguage(language);

    this._languageSource.next(this.selectedLanguage);
  }

  public observer() {
    return this.languageItem$;
  }

  public getSelectedLanguage() {
    return this.selectedLanguage;
  }

  private selectLanguage(language: string) {
    this.selectedLanguage = this.cutLocale(language);

    if (this.translations[this.selectedLanguage] === undefined) {
      this.selectedLanguage = "en";
    }
  }

  private detectLanguage() {
    return navigator.language;
  }

  private cutLocale(str: string) {
    return str.substring(0, 2);
  }
}
