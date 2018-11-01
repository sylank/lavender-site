import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../shared/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.pug',
  styleUrls: ['./gallery.component.sass']
})
export class GalleryComponent implements OnInit {

  constructor(private galleryService: GalleryService) { }

  gallery: any;
  activeImage: string;
  active: string;
  isCarouselOpen: boolean = false;
  displayCarousel: string = "none";

  onMouseEnter(index: string): void {
    this.galleryService.opacityControl.next(index);
  }

  onMouseLeave(): void {
    this.galleryService.opacityControl.next();
  }

  openCarousel(index: string): void {
    this.isCarouselOpen = true;
    this.displayCarousel = "flex";
    this.activeImage = this.gallery[Number(index)];
    this.galleryService.getActiveImage.next(this.activeImage);
    this.galleryService.navbarBackground.next("open");
  }

  closeCarousel(): void {
    this.isCarouselOpen = false;
    this.displayCarousel = "none";
    this.galleryService.navbarBackground.next("close");
  }

  loadImage(command: string): void {
    if (command === "next") {
      let nextIndex: number = this.gallery.indexOf(this.activeImage) + 1;
      if (nextIndex === this.gallery.length) {
        nextIndex = 0;
      }
      this.activeImage = this.gallery[nextIndex];
      this.galleryService.getActiveImage.next(this.activeImage);
    } else if (command === "prev") {
      let prevIndex: number = this.gallery.indexOf(this.activeImage) - 1;
      if (prevIndex < 0) {
        prevIndex = this.gallery.length - 1;
      }
      this.activeImage = this.gallery[prevIndex];
      this.galleryService.getActiveImage.next(this.activeImage);
    }
  }

  ngOnInit(): void {
    this.galleryService.getGallery().subscribe((response) => {
      this.gallery = response;
      this.activeImage = this.gallery[0];
    })
  }

}
