import { Component, HostListener, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('opening') openingRef: ElementRef;
  @ViewChild('intro') introRef: ElementRef;
  @ViewChild('location') locationRef: ElementRef;
  @ViewChild('rooms') roomsRef: ElementRef;
  @ViewChild('radar') radarRef: ElementRef;
  @ViewChild('booking') bookingRef: ElementRef;
  @ViewChild('seasonal') seasonalRef: ElementRef;


  public isScrolled = false;
  private winHeight;
  private winWidth;


  ngAfterViewInit() {
    this.winHeight = window.innerHeight;
    this.winWidth = window.innerWidth;

    // ki kell számolni az összes panel helyét (le kell kérdezni)
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event) {
    const currPos = (window.pageYOffset || $event.target.scrollTop) - ($event.target.clientTop || 0);

    if (currPos > 64) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }

    // össze kell hasonlítani az összeset, az van kijelölve amelyiken állunk

    const hT = this.locationRef.nativeElement.offsetTop;
    const hH = this.locationRef.nativeElement.offsetHeight - 200;
    const wH = this.winHeight;
    const wS = currPos;
    if (wS > (hT + hH - wH)) {
      console.log('elerte');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.winHeight = event.target.innerHeight;
    this.winWidth = event.target.innerWidth;
  }

  onClick(e) {
    const elements = document.querySelectorAll('.link');

    console.log(elements);
    document.querySelectorAll('.link');

    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('selected');
    }

    e.target.classList.add('selected');
  }
}
