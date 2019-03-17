import { Component, OnInit, HostBinding } from '@angular/core';
import { GalleryService } from '../shared/gallery.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.pug',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  animation = false;

  @HostBinding('class.hamburger') hamburger = false;

  constructor(private galleryService: GalleryService) { }

  background = false;
  opacity = false;

  changeBg() {
    if (this.animation) {
      this.background = true;
    } else {
      window.scrollY > 80 ? this.background = true : this.background = false;
    }
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

  clearHeader() {
    this.galleryService.navbarBackground.next('close');
    this.hamburger = false;
    this.animation = false;
    this.changeBg();
  }

}
