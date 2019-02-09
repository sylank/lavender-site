import { Directive, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { GalleryService } from './gallery.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appImageLoader]'
})
export class ImageLoaderDirective implements OnInit {

  constructor(private galleryService: GalleryService) { }

  @HostBinding('style.background-image') bgImage = '';
  loadImage: Subscription;

  ngOnInit() {
    this.loadImage = this.galleryService.getActiveImage.subscribe((response) => {
      console.log(response);
      this.bgImage = `url("${response}")`;
    });
  }

  ngOnDestroy() {
    this.loadImage.unsubscribe();
  }

}
