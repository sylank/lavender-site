import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class GalleryService {

  constructor(private http: HttpClient) { }

  getActiveImage = new Subject();
  opacityControl = new Subject();
  navbarBackground = new Subject();

  getGallery() {
    return this.http.get('assets/gallery.json');
  }

}
