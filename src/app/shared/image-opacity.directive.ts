import { Directive, OnInit, HostBinding, AfterViewInit, ElementRef } from '@angular/core';
import { GalleryService } from './gallery.service';

@Directive({
  selector: '[appImageOpacity]'
})
export class ImageOpacityDirective implements OnInit {

  constructor(private galleryService: GalleryService, private element: ElementRef) { }

  ngAfterViewInit() {
    this.galleryService.opacityControl.subscribe((index: number) => {
      if (index !== undefined) {
        console.log(index, this.element.nativeElement.id)
        if (index != this.element.nativeElement.id) {
        this.element.nativeElement.style.opacity = ".4";
        }
      } else {
        this.element.nativeElement.style.opacity = "1";
      }
      

    })
  }

  ngOnInit() {}

}
