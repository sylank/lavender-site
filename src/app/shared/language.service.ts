import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageService  {

  private languageFiles = {
    hu: '../../assets/lng/hu.json',
    en: '../../assets/lng/en.json',
    de: '../../assets/lng/de.json'
  }

  private translations =
  {
    hu: {},
    en: {},
    de: {}
  }

  private selectedLanguage: string;
  private observable;

  constructor(private http: HttpClient) {
    this.selectedLanguage = this.cutLocale(this.detectLanguage())

    if (this.translations[this.selectedLanguage] === undefined) {
      this.selectedLanguage = 'en'
    }
  }

  public getTranslation(): Observable<Object> {
     const obj = this.translations[this.selectedLanguage]

     if (Object.keys(obj).length === 0 && obj.constructor === Object) {
       this.observable = this.http.get(this.languageFiles[this.selectedLanguage]).pipe(
        map(response =>  {
          this.observable = null;
          this.translations[this.selectedLanguage] = response;

          return this.translations[this.selectedLanguage];
        }));

      return this.observable;
     } else {
          return of(obj);
     }
  }

  private detectLanguage() {
    return navigator.language
  }

  private cutLocale(str: string) {
    return str.substring(0, 2);
  }
}
