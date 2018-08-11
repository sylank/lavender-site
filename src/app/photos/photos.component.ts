import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../shared/gallery.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private galleryService: GalleryService) { }

  private gallery: any;

  ngOnInit() {
    this.galleryService.getGallery().subscribe((response) => {
      this.gallery = response;
      console.log(this.gallery);
    })
  }

}
