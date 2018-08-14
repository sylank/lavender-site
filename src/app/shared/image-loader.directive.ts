import { Directive, OnInit, HostBinding, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core';
import { GalleryService } from './gallery.service';

@Directive({
  selector: '[appImageLoader]'
})
export class ImageLoaderDirective implements OnInit {

  constructor(private galleryService: GalleryService) { }

  @HostBinding("style.background-image") bgImage: string = "";
  loadImage: any;

  ngOnInit() {
    this.loadImage = this.galleryService.getActiveImage.subscribe((response) => {
      console.log(response);
      this.bgImage = `url("${response}")`;
    })
  }

  ngOnDestroy() {
    this.loadImage.unsubscribe();
    console.log("unsubbed");
  }

  

}