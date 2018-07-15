import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onScroll($event) {
    const currPos = (window.pageYOffset || $event.target.scrollTop) - ($event.target.clientTop || 0);

    if (currPos > 64) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
