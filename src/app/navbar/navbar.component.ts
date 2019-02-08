import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../shared/gallery.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.pug',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(private galleryService: GalleryService) { }

  background = false;
  opacity = false;

  changeBg() {
    window.scrollY > 80 ? this.background = true : this.background = false;
  }

  ngOnInit() {
    this.galleryService.navbarBackground.subscribe((res) => {
      if (res === 'open') {
        this.opacity = true;
      } else {
        this.opacity = false;
      }
    });
  }

}
