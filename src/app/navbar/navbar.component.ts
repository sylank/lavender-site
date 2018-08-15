import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../shared/gallery.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private galleryService: GalleryService) { }

  background: boolean = false;
  opacity: boolean = false;

  changeBg() {
    window.scrollY > 80 ? this.background = true : this.background = false;
  }

  ngOnInit() {
    this.galleryService.navbarBackground.subscribe((res) => {
      console.log(res);
      if (res === "open") {
        this.opacity = true;
      } else {
        this.opacity = false;
      }
    })
  }

}
