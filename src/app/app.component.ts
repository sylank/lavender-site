import { SectionLocation } from './model/SectionLocation';
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

  private OFFSET = 200;
  private SELECTED_CLASS = 'selected';

  public isScrolled = false;
  private winHeight;


  ngAfterViewInit() {
    this.winHeight = window.innerHeight;
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
    return (window.pageYOffset || $event.target.scrollTop) - ($event.target.clientTop || 0);
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

    if (currentPosition > this.calculateSectionPosition(openingLocation) &&
      currentPosition < this.calculateSectionPosition(introLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.openingLinkRef);
    }

    if (currentPosition > this.calculateSectionPosition(introLocation) &&
      currentPosition < this.calculateSectionPosition(locationLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.introLinkRef);
    }

    if (currentPosition > this.calculateSectionPosition(locationLocation) &&
      currentPosition < this.calculateSectionPosition(roomsLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.locationLinkRef);
    }

    if (currentPosition > this.calculateSectionPosition(roomsLocation) &&
      currentPosition < this.calculateSectionPosition(radarLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.roomsLinkRef);
    }

    if (currentPosition > this.calculateSectionPosition(radarLocation) &&
      currentPosition < this.calculateSectionPosition(bookingLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.radarLinkRef);
    }

    if (currentPosition > this.calculateSectionPosition(bookingLocation) &&
      currentPosition < this.calculateSectionPosition(seasonalLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.bookingLinkRef);
    }

    if (currentPosition > this.calculateSectionPosition(seasonalLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.seasonalLinkRef);
    }
  }

  private calculateSectionPosition(sectionLocation: SectionLocation) {
    return sectionLocation.getTop() + sectionLocation.getHeight() - this.winHeight;
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
