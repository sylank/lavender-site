import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.pug',
  styleUrls: ['./booking.component.sass']
})
export class BookingComponent implements OnInit {

  constructor() { }

  private months = ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"];

  private showCalendar: boolean = false;
  public dateOfArrival: Date;
  public arrivalCalendarActive: boolean = false;
  public departureCalendarActive: boolean = false;
  public dateOfDeparture: Date;

  private bookingStage: "fill" | "details" = "fill";

  private fullName: string = "Kugler Krisztián";
  private phoneNumber: string = "06 1 323 4757";
  private email: string = "test@gmail.com";

  private messageLength: number = 300;

  private showDimmed: boolean = false;

  onMessageInput(element: HTMLTextAreaElement): void {
    this.messageLength = 300 - element.value.length;
  }

  showArrivalCalendar(): void {
    this.showCalendar = !this.showCalendar;
    this.arrivalCalendarActive = !this.arrivalCalendarActive;
    this.showDimmed = !this.showDimmed;
  }

  setDates(event: Date): void {
    this.dateOfArrival = event;
    if (event.getTime() >= this.dateOfDeparture.getTime()) {
      this.dateOfDeparture = new Date(this.dateOfArrival);
      this.dateOfDeparture.setDate(this.dateOfArrival.getDate() + 1);
    }
  }

  onCalendarDestroy(): void {
    this.arrivalCalendarActive = false;
    this.departureCalendarActive = false;
    this.showCalendar = false;
  }

  ngOnInit() {
    this.dateOfArrival = new Date();
    this.dateOfDeparture = new Date(this.dateOfArrival);
    this.dateOfDeparture.setDate(this.dateOfArrival.getDate() + 1);
    console.log(this.dateOfArrival, this.dateOfDeparture);
  }

}
