import { Component, HostListener, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('openingLink') openingLinkRef: ElementRef;
  @ViewChild('introLink') introLinkRef: ElementRef;
  @ViewChild('locationLink') locationLinkRef: ElementRef;
  @ViewChild('roomsLink') roomsLinkRef: ElementRef;
  @ViewChild('radarLink') radarLinkRef: ElementRef;
  @ViewChild('bookingLink') bookingLinkRef: ElementRef;
  @ViewChild('seasonalLink') seasonalLinkRef: ElementRef;

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

    const openingTop = this.openingLinkRef.nativeElement.offsetTop;
    const openingHeight = this.openingLinkRef.nativeElement.offsetHeight - 200;

    const introTop = this.introRef.nativeElement.offsetTop;
    const introHeight = this.introRef.nativeElement.offsetHeight - 200;

    const locationTop = this.locationRef.nativeElement.offsetTop;
    const locationHeight = this.locationRef.nativeElement.offsetHeight - 200;

    const roomsTop = this.roomsRef.nativeElement.offsetTop;
    const roomsHeight = this.roomsRef.nativeElement.offsetHeight - 200;

    const radarTop = this.radarRef.nativeElement.offsetTop;
    const radarHeight = this.radarRef.nativeElement.offsetHeight - 200;

    const bookingTop = this.bookingRef.nativeElement.offsetTop;
    const bookingHeight = this.bookingRef.nativeElement.offsetHeight - 200;

    const seasonalTop = this.seasonalRef.nativeElement.offsetTop;
    const seasonalHeight = this.seasonalRef.nativeElement.offsetHeight - 200;


    const wH = this.winHeight;
    const wS = currPos;

    if (wS > (openingTop + openingHeight - wH) &&
      wS < (introTop + introHeight - wH)) {
      console.log('opening');



      const elements = document.querySelectorAll('.link');

      console.log(elements);
      document.querySelectorAll('.link');

      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('selected');
      }

      this.openingLinkRef.nativeElement.classList.add('selected');
    }

    if (wS > (introTop + introHeight - wH) &&
      wS < (locationTop + locationHeight - wH)) {
      console.log('intro');



      const elements = document.querySelectorAll('.link');

      console.log(elements);
      document.querySelectorAll('.link');

      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('selected');
      }

      this.introLinkRef.nativeElement.classList.add('selected');
    }

    if (wS > (locationTop + locationHeight - wH) &&
      wS < (roomsTop + roomsHeight - wH)) {
      console.log('location');



      const elements = document.querySelectorAll('.link');

      console.log(elements);
      document.querySelectorAll('.link');

      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('selected');
      }

      this.locationLinkRef.nativeElement.classList.add('selected');
    }

    if (wS > (roomsTop + roomsHeight - wH) &&
      wS < (radarTop + radarHeight - wH)) {
      console.log('rooms');


      const elements = document.querySelectorAll('.link');

      console.log(elements);
      document.querySelectorAll('.link');

      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('selected');
      }

      this.roomsLinkRef.nativeElement.classList.add('selected');
    }

    if (wS > (radarTop + radarHeight - wH) &&
      wS < (bookingTop + bookingHeight - wH)) {
      console.log('radar');



      const elements = document.querySelectorAll('.link');

      console.log(elements);
      document.querySelectorAll('.link');

      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('selected');
      }

      this.radarLinkRef.nativeElement.classList.add('selected');
    }

    if (wS > (bookingTop + bookingHeight - wH) &&
      wS < (seasonalTop + seasonalHeight - wH)) {
      console.log('booking');



      const elements = document.querySelectorAll('.link');

      console.log(elements);
      document.querySelectorAll('.link');

      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('selected');
      }

      this.bookingLinkRef.nativeElement.classList.add('selected');
    }

    if (wS > (seasonalTop + seasonalHeight - wH)) {
      console.log('seasonal');



      const elements = document.querySelectorAll('.link');

      console.log(elements);
      document.querySelectorAll('.link');

      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('selected');
      }

      this.seasonalLinkRef.nativeElement.classList.add('selected');
    }

    /*if (wS > (hT + hH - wH)) {
      console.log('elerte');
    }*/
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
