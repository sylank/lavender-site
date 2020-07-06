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

  openCarousel(index: number): void {
    this.displayCarousel = "visible";
    this.activeImage = this.gallery[index].location;
    this.activeCaption = this.gallery[index].caption;
    this.activeText = this.gallery[index].text;
    this.galleryService.getActiveImage.next(this.activeImage);
    this.galleryService.navbarBackground.next("open");

    this.activeIndex = index;

    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.IMAGE_VIEW_EVENT,
      GoogleAnalyticsConstants.OPEN_ACTION,
      "",
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
      "",
      1
    );
  }

  loadNextImage(event: any) {
    this.activeIndex++;
    if (this.activeIndex === this.gallery.length) {
      this.activeIndex = 0;
    }

    this.loadImage();
    event.stopPropagation();

    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.IMAGE_VIEW_EVENT,
      GoogleAnalyticsConstants.NEXT_ACTION,
      "",
      1
    );
  }

  loadPrevImage(event: any) {
    this.activeIndex--;
    if (this.activeIndex < 0) {
      this.activeIndex = this.gallery.length - 1;
    }

    this.loadImage();
    event.stopPropagation();

    this.googleAnalyticsService.eventEmitter(
      GoogleAnalyticsConstants.IMAGE_VIEW_EVENT,
      GoogleAnalyticsConstants.BACK_ACTION,
      "",
      1
    );
  }

  loadImage(): void {
    this.activeImage = this.gallery[this.activeIndex].location;
    this.activeCaption = this.gallery[this.activeIndex].caption;
    this.activeText = this.gallery[this.activeIndex].text;
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
      this.activeImage = this.gallery[0].location;
    });
  }
}
