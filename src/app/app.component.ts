import { SectionLocation } from './model/SectionLocation';
import {
  Component,
  HostListener,
  ViewChild,
  AfterViewInit,
  OnInit,
  ElementRef
} from '@angular/core';

import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  lat = 46.706967;
  lng = 17.362545;

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

  private OFFSET = 200;
  private SELECTED_CLASS = 'selected';

  public isScrolled = false;
  private winHeight;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit() {
    this.winHeight = window.innerHeight;

    this.galleryOptions = [
      {
        width: '50vw',
        height: '80vh',
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/images/1.jpg',
        medium: 'assets/images/1.jpg',
        big: 'assets/images/1.jpg'
      },
      {
        small: 'assets/images/2.jpg',
        medium: 'assets/images/2.jpg',
        big: 'assets/images/2.jpg'
      },
      {
        small: 'assets/images/3.jpg',
        medium: 'assets/images/3.jpg',
        big: 'assets/images/3.jpg'
      },
      {
        small: 'assets/images/4.jpg',
        medium: 'assets/images/4.jpg',
        big: 'assets/images/4.jpg'
      },
      {
        small: 'assets/images/5.jpg',
        medium: 'assets/images/5.jpg',
        big: 'assets/images/5.jpg'
      },
      {
        small: 'assets/images/6.jpg',
        medium: 'assets/images/6.jpg',
        big: 'assets/images/6.jpg'
      },
      {
        small: 'assets/images/7.jpg',
        medium: 'assets/images/7.jpg',
        big: 'assets/images/7.jpg'
      },
      {
        small: 'assets/images/8.jpg',
        medium: 'assets/images/8.jpg',
        big: 'assets/images/8.jpg'
      },
      {
        small: 'assets/images/9.jpg',
        medium: 'assets/images/9.jpg',
        big: 'assets/images/9.jpg'
      }
    ];
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event) {
    const currentPosition = this.calculateViewPort($event);

    this.resizeMenuByScroll(currentPosition);
    this.selectMenuElementsByScroll(currentPosition);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.winHeight = event.target.innerHeight;
  }

  onClick(e) {
    this.clearMenuSelection();

    e.target.classList.add(this.SELECTED_CLASS);
  }

  private calculateViewPort($event): number {
    return (
      (window.pageYOffset || $event.target.scrollTop) -
      ($event.target.clientTop || 0)
    );
  }

  private resizeMenuByScroll(currentPosition: number) {
    if (currentPosition > 64) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  private selectMenuElementsByScroll(currentPosition: number) {
    const openingLocation = this.calculateSectionLocation(this.openingRef);
    const introLocation = this.calculateSectionLocation(this.introRef);
    const locationLocation = this.calculateSectionLocation(this.locationRef);
    const roomsLocation = this.calculateSectionLocation(this.roomsRef);
    const radarLocation = this.calculateSectionLocation(this.radarRef);
    const bookingLocation = this.calculateSectionLocation(this.bookingRef);
    const seasonalLocation = this.calculateSectionLocation(this.seasonalRef);

    if (
      this.isViewportInsideSection(
        currentPosition,
        openingLocation,
        introLocation
      )
    ) {
      this.clearMenuSelection();
      this.selectMenuElement(this.openingLinkRef);
    }

    if (
      this.isViewportInsideSection(
        currentPosition,
        introLocation,
        locationLocation
      )
    ) {
      this.clearMenuSelection();
      this.selectMenuElement(this.introLinkRef);
    }

    if (
      this.isViewportInsideSection(
        currentPosition,
        locationLocation,
        roomsLocation
      )
    ) {
      this.clearMenuSelection();
      this.selectMenuElement(this.locationLinkRef);
    }

    if (
      this.isViewportInsideSection(
        currentPosition,
        roomsLocation,
        radarLocation
      )
    ) {
      this.clearMenuSelection();
      this.selectMenuElement(this.roomsLinkRef);
    }

    if (
      this.isViewportInsideSection(
        currentPosition,
        radarLocation,
        bookingLocation
      )
    ) {
      this.clearMenuSelection();
      this.selectMenuElement(this.radarLinkRef);
    }

    if (
      this.isViewportInsideSection(
        currentPosition,
        bookingLocation,
        seasonalLocation
      )
    ) {
      this.clearMenuSelection();
      this.selectMenuElement(this.bookingLinkRef);
    }

    if (currentPosition > this.calculateSectionPosition(seasonalLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.seasonalLinkRef);
    }
  }

  private isViewportInsideSection(
    currentPosition: number,
    location1: SectionLocation,
    location2: SectionLocation
  ) {
    return (
      currentPosition > this.calculateSectionPosition(location1) &&
      currentPosition < this.calculateSectionPosition(location2)
    );
  }

  private calculateSectionPosition(sectionLocation: SectionLocation): number {
    return (
      sectionLocation.getTop() + sectionLocation.getHeight() - this.winHeight
    );
  }

  private calculateSectionLocation(element: ElementRef): SectionLocation {
    const top = element.nativeElement.offsetTop;
    const height = element.nativeElement.offsetHeight - this.OFFSET;

    return new SectionLocation(top, height);
  }

  private clearMenuSelection() {
    const elements = document.querySelectorAll('.link');

    document.querySelectorAll('.link');

    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(this.SELECTED_CLASS);
    }
  }

  private selectMenuElement(element: ElementRef) {
    element.nativeElement.classList.add(this.SELECTED_CLASS);
  }
}
