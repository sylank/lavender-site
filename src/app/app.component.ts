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

    if (this.isViewportInsideSection(currentPosition, openingLocation, introLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.openingLinkRef);
    }

    if (this.isViewportInsideSection(currentPosition, introLocation, locationLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.introLinkRef);
    }

    if (this.isViewportInsideSection(currentPosition, locationLocation, roomsLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.locationLinkRef);
    }

    if (this.isViewportInsideSection(currentPosition, roomsLocation, radarLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.roomsLinkRef);
    }

    if (this.isViewportInsideSection(currentPosition, radarLocation, bookingLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.radarLinkRef);
    }

    if (this.isViewportInsideSection(currentPosition, bookingLocation, seasonalLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.bookingLinkRef);
    }

    if (currentPosition > this.calculateSectionPosition(seasonalLocation)) {
      this.clearMenuSelection();
      this.selectMenuElement(this.seasonalLinkRef);
    }
  }

  private isViewportInsideSection(currentPosition: number, location1: SectionLocation, location2: SectionLocation) {

    return currentPosition > this.calculateSectionPosition(location1) &&
      currentPosition < this.calculateSectionPosition(location2);
  }

  private calculateSectionPosition(sectionLocation: SectionLocation): number {
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
