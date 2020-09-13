import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { LanguageService } from "./language.service";

@Injectable()
export class GalleryService {
  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {}

  getActiveImage = new Subject();
  opacityControl = new Subject();
  navbarBackground = new Subject();

  getGallery() {
    return this.http.get(
      "assets/gallery/gallery_" +
        this.languageService.getSelectedLanguage() +
        ".json"
    );
  }
}
