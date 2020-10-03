import { Component, OnInit, HostBinding, HostListener } from "@angular/core";
import { GalleryService } from "../shared/gallery.service";
import { LanguageService } from "../shared/language.service";
import { trigger, transition, style, animate } from "@angular/animations";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.pug",
  styleUrls: ["./navbar.component.sass"],
  animations: [
    trigger("inOutAnimation", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("0.1s ease-out", style({ opacity: 1 })),
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("0.1s ease-in", style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  background = false;
  opacity = false;
  animation = false;
  langSelector = false;
  wasInside = false;

  @HostBinding("class.hamburger") hamburger = false;

  constructor(
    private galleryService: GalleryService,
    private languageService: LanguageService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.galleryService.navbarBackground.subscribe((res) => {
      if (res === "open") {
        this.opacity = true;
      } else {
        this.opacity = false;
      }
    });

    const cookieValue = this.cookieService.get("selected-language");
    if (cookieValue) {
      this.selectLanguage(cookieValue);
    }
  }

  @HostListener("click")
  clickInside() {
    this.wasInside = true;
  }

  @HostListener("document:click", ["$event"])
  clickout(event) {
    if (!this.wasInside) {
      this.langSelector = false;
    }

    if (!this.wasInside) {
      this.clearHeader();
    }

    this.wasInside = false;
  }

  changeBg() {
    if (this.animation) {
      this.background = true;
    } else {
      window.scrollY > 10
        ? (this.background = true)
        : (this.background = false);
    }
  }

  clearHeader() {
    this.galleryService.navbarBackground.next("close");
    this.hamburger = false;
    this.langSelector = false;
    this.animation = false;
    this.changeBg();
  }

  selectLanguage(value: string) {
    // this.langSelector = true;

    this.languageService.setLanguage(value);
    this.cookieService.set("selected-language", value);
  }

  getLanguageClass() {
    return this.languageService.getSelectedLanguage();
  }
}
