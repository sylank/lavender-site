import { Component, OnInit, HostListener } from "@angular/core";
import { GalleryService } from "../shared/gallery.service";
import { GoogleAnalyticsService } from "../shared/google-analytics.service";
import { GoogleAnalyticsConstants } from "../shared/google.analytics.constants";
import { LanguageService } from "../shared/language.service";

@Component({
  selector: "app-apartments",
  templateUrl: "./apartments.component.pug",
  styleUrls: ["./apartments.component.sass"],
})
export class ApartmentsComponent implements OnInit {
  gallery: any;
  activeImage: string;
  activeIndex: number;
  displayCarousel = "collapse";
  selectedApartment: "lavender1" | "lavender2" = "lavender1";

  public activeCaption: string = "";
  public activeText: string = "";

  constructor(
    private galleryService: GalleryService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private languageService: LanguageService
  ) {
    this.languageService
      .observer()
      .subscribe((data: any) => this.loadGalleryData());
  }

  @HostListener("document:keydown.escape", ["$event"]) onEscKeyDownHandler(
    event: KeyboardEvent
  ) {
    this.closeCarousel(event);
  }

  @HostListener("document:keydown.ArrowLeft", ["$event"]) onLeftKeyDownHandler(
    event: KeyboardEvent
  ) {
    this.loadPrevImage(event);
  }
  @HostListener("document:keydown.ArrowRight", ["$event"])
  onRightKeyDownHandler(event: KeyboardEvent) {
    this.loadNextImage(event);
  }

  openCarousel(apartmentKey: "lavender1" | "lavender2" = "lavender1"): void {
    this.selectedApartment = apartmentKey;
    if (this.gallery[apartmentKey].length != 0) {
      this.displayCarousel = "visible";
      this.activeImage = this.gallery[apartmentKey][0].location;
      this.activeCaption = this.gallery[apartmentKey][0].caption;
      this.activeText = this.gallery[apartmentKey][0].text;
      this.galleryService.getActiveImage.next(this.activeImage);
      this.galleryService.navbarBackground.next("open");

      this.activeIndex = 0;
    }

    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.IMAGE_VIEW_EVENT,
      GoogleAnalyticsConstants.OPEN_ACTION,
      this.selectedApartment,
      1
    );
  }

  closeCarousel(event: any): void {
    this.displayCarousel = "collapse";
    this.galleryService.navbarBackground.next("close");
    event.stopPropagation();

    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.IMAGE_VIEW_EVENT,
      GoogleAnalyticsConstants.CLOSE_ACTION,
      this.selectedApartment,
      1
    );
  }

  loadNextImage(event: any) {
    this.activeIndex++;
    if (this.activeIndex === this.gallery[this.selectedApartment].length) {
      this.activeIndex = 0;
    }

    this.loadImage();
    event.stopPropagation();

    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.IMAGE_VIEW_EVENT,
      GoogleAnalyticsConstants.NEXT_ACTION,
      this.selectedApartment,
      1
    );
  }

  loadPrevImage(event: any) {
    this.activeIndex--;
    if (this.activeIndex < 0) {
      this.activeIndex = this.gallery[this.selectedApartment].length - 1;
    }

    this.loadImage();
    event.stopPropagation();

    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.IMAGE_VIEW_EVENT,
      GoogleAnalyticsConstants.BACK_ACTION,
      this.selectedApartment,
      1
    );
  }

  loadImage(): void {
    this.activeImage = this.gallery[this.selectedApartment][
      this.activeIndex
    ].location;
    this.activeCaption = this.gallery[this.selectedApartment][
      this.activeIndex
    ].caption;
    this.activeText = this.gallery[this.selectedApartment][
      this.activeIndex
    ].text;
    this.galleryService.getActiveImage.next(this.activeImage);
  }

  imageClick(event: any) {
    this.loadNextImage(event);
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.loadGalleryData();
  }

  private loadGalleryData() {
    this.galleryService.getGallery().subscribe((response) => {
      this.gallery = response;
      this.activeImage = this.gallery[this.selectedApartment][0].location;
    });
  }
}
