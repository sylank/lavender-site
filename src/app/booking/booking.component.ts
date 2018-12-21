import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar/calendar.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.pug',
  styleUrls: ['./booking.component.sass']
})
export class BookingComponent implements OnInit {

  constructor(private calendarService: CalendarService) { }

  private months: string[] = ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"];
  private calendarMode: "arrival" | "departure" = "arrival";
  private showCalendar: boolean = false;
  private dateOfArrival: Date;
  private dateOfDeparture: Date;
  private bookedDays: number = 1;
  private price: any = 25000;
  private arrivalCalendarActive: boolean = false;
  private departureCalendarActive: boolean = false;
  private calendarInitDate: Date; // To determine which date the calendar should open up with
  private bookingStage: "fill" | "details" = "fill";
  private fullName: string = "";
  private phoneNumber: string = "";
  private email: string = "";
  private messageLength: number = 300;
  private enableNextStep: boolean = false;

  onMessageInput(element: HTMLTextAreaElement): void {
    this.messageLength = 300 - element.value.length;
  }

  toggleArrivalCalendar(): void {
    this.departureCalendarActive = false;
    if (this.showCalendar && this.calendarMode === "departure") {
      this.calendarMode = "arrival";
    } else {
      this.showCalendar = !this.showCalendar;
    }
    this.calendarMode = "arrival";
    this.calendarInitDate = this.dateOfArrival;
    if (this.showCalendar && this.calendarMode === "arrival") {
      this.arrivalCalendarActive = true;
    } else {
      this.arrivalCalendarActive = false;
    }
    this.calendarService.setSelectedDate(this.dateOfArrival);
    this.calendarService.updateCalendar.next(this.dateOfArrival);
  }

  toggleDepartureCalendar(): void {
    this.arrivalCalendarActive = false;
    if (this.showCalendar && this.calendarMode === "arrival") {
      this.calendarMode = "departure";
    } else {
      this.showCalendar = !this.showCalendar;
    }
    this.calendarMode = "departure";
    this.calendarInitDate = this.dateOfDeparture;
    if (this.showCalendar && this.calendarMode === "departure") {
      this.departureCalendarActive = true;
    } else {
      this.departureCalendarActive = false;
    }
    this.calendarService.setSelectedDate(this.dateOfDeparture);
    this.calendarService.updateCalendar.next(this.dateOfDeparture);
  }

  setDate(date: Date): void {
    switch (this.calendarMode) {
      case "arrival":
        this.dateOfArrival = date;
        if (date.getTime() >= this.dateOfDeparture.getTime() - 86400000) {
          this.dateOfDeparture = new Date(this.dateOfArrival.getFullYear(), this.dateOfArrival.getMonth(), this.dateOfArrival.getDate() + 1);
        }
        break;
      case "departure":
        this.dateOfDeparture = date;
        if (date.getTime() < this.dateOfArrival.getTime() + 86400000) {
          this.dateOfArrival = new Date(this.dateOfDeparture.getFullYear(), this.dateOfDeparture.getMonth(), this.dateOfDeparture.getDate() - 1);
        }
    }
    this.setPrice();
  }

  setPrice(): void {
    if ((this.dateOfDeparture.getTime() - this.dateOfArrival.getTime()) / 86400000 < 1) {
      this.bookedDays = 1;
    } else {
      this.bookedDays = Math.ceil((this.dateOfDeparture.getTime() - this.dateOfArrival.getTime()) / 86400000);
    }
    this.price = (this.bookedDays * 25000).toLocaleString();
  }

  onCalendarDestroy(): void {
    this.arrivalCalendarActive = false;
    this.departureCalendarActive = false;
    this.showCalendar = false;
  }

  nextStep(fullNameInput: HTMLInputElement, phoneNumberInput: HTMLInputElement): void {
    if (fullNameInput.value.length === 0 || phoneNumberInput.value.length === 0) {
      return;
    }
    this.bookingStage = "details";
  }

  prevStep(): void {
    this.bookingStage = "fill";
  }

  ngOnInit() {
    this.dateOfArrival = new Date();
    this.dateOfArrival.setDate(this.dateOfArrival.getDate() + 1);
    this.dateOfDeparture = new Date(this.dateOfArrival);
    this.dateOfDeparture.setDate(this.dateOfArrival.getDate() + 1);
    this.setPrice();
  }

}
