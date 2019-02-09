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
  activeCaption: string;
  activeIndex: number;
  displayCarousel = 'none';

  onMouseEnter(index: string): void {
    this.galleryService.opacityControl.next(index);
  }

  onMouseLeave(): void {
    this.galleryService.opacityControl.next();
  }

  openCarousel(index: number): void {
    this.displayCarousel = 'flex';
    this.activeImage = this.gallery[index].location;
    this.activeCaption = this.gallery[index].caption;
    this.galleryService.getActiveImage.next(this.activeImage);
    this.galleryService.navbarBackground.next('open');

    this.activeIndex = index;
  }

  closeCarousel(event: any): void {
    this.displayCarousel = 'none';
    this.galleryService.navbarBackground.next('close');
    event.stopPropagation();
  }

  loadImage(command: string, event: any): void {
    if (command === 'next') {
      this.activeIndex++;
      if (this.activeIndex === this.gallery.length) {
        this.activeIndex = 0;
      }
    }

    if (command === 'prev') {
      this.activeIndex--;
      if (this.activeIndex < 0) {
        this.activeIndex = this.gallery.length - 1;
      }
    }

    this.activeImage = this.gallery[this.activeIndex].location;
    this.activeCaption = this.gallery[this.activeIndex].caption;
    this.galleryService.getActiveImage.next(this.activeImage);

    event.stopPropagation();
  }

  ngOnInit(): void {
    this.galleryService.getGallery().subscribe((response) => {
      this.gallery = response;
      this.activeImage = this.gallery[0].location;
    });
  }

}
