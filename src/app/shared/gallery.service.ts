import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class GalleryService {

  constructor(private http: HttpClient) { }

  getGallery() {
    return this.http.get("assets/gallery.json");
  }

  getActiveImage = new Subject();
  opacityControl = new Subject();
  navbarBackground = new Subject();


}
