import { Component, OnInit, HostListener } from "@angular/core";
import { GalleryService } from "../shared/gallery.service";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.pug",
  styleUrls: ["./gallery.component.sass"]
})
export class GalleryComponent implements OnInit {
  gallery: any;
  activeImage: string;
  activeIndex: number;
  displayCarousel = "collapse";

  public activeCaption: string = "";
  public activeText: string = "";

  constructor(private galleryService: GalleryService) {}

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
  @HostListener("document:keydown.ArrowRight", ["$event"]) onRightKeyDownHandler(
    event: KeyboardEvent
  ) {
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
  }

  closeCarousel(event: any): void {
    this.displayCarousel = "collapse";
    this.galleryService.navbarBackground.next("close");
    event.stopPropagation();
  }

  loadNextImage(event: any) {
    this.activeIndex++;
    if (this.activeIndex === this.gallery.length) {
      this.activeIndex = 0;
    }

    this.loadImage();
    event.stopPropagation();
  }

  loadPrevImage(event: any) {
    this.activeIndex--;
    if (this.activeIndex < 0) {
      this.activeIndex = this.gallery.length - 1;
    }

    this.loadImage();
    event.stopPropagation();
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
    this.galleryService.getGallery().subscribe(response => {
      this.gallery = response;
      this.activeImage = this.gallery[0].location;
    });
  }
}
