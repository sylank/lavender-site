import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar/calendar.service';
import { NgForm } from '@angular/forms';

interface Booking {
  arrival: Date,
  departure: Date,
  nights: number,
  price: number,
  name: string,
  phone: string,
  email: string,
  message: string
}

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
  private arrivalCalendarActive: boolean = false;
  private departureCalendarActive: boolean = false;
  private calendarInitDate: Date; // To determine which date the calendar should open up with
  private bookingStage: "form" | "overview" = "form";
  private messageLength: number = 300;

  private booking: Booking = {
    arrival: new Date(),
    departure: new Date(),
    nights: 1,
    price: 25000,
    name: "",
    phone: "",
    email: "",
    message: ""
  }

  onMessageInput(element: HTMLTextAreaElement): void {
    this.messageLength = 300 - element.value.length;
  }

  toggleArrivalCalendar(event: PointerEvent): void {
    event.stopPropagation();
    this.departureCalendarActive = false;
    if (this.showCalendar && this.calendarMode === "departure") {
      this.calendarMode = "arrival";
    } else {
      this.showCalendar = !this.showCalendar;
    }
    this.calendarMode = "arrival";
    this.calendarInitDate = this.booking.arrival;
    if (this.showCalendar && this.calendarMode === "arrival") {
      this.arrivalCalendarActive = true;
    } else {
      this.arrivalCalendarActive = false;
    }
    this.calendarService.setSelectedDate(this.booking.arrival);
    this.calendarService.updateCalendar.next(this.booking.arrival);
  }

  toggleDepartureCalendar(event: PointerEvent): void {
    event.stopPropagation();
    this.arrivalCalendarActive = false;
    if (this.showCalendar && this.calendarMode === "arrival") {
      this.calendarMode = "departure";
    } else {
      this.showCalendar = !this.showCalendar;
    }
    this.calendarMode = "departure";
    this.calendarInitDate = this.booking.departure;
    if (this.showCalendar && this.calendarMode === "departure") {
      this.departureCalendarActive = true;
    } else {
      this.departureCalendarActive = false;
    }
    this.calendarService.setSelectedDate(this.booking.departure);
    this.calendarService.updateCalendar.next(this.booking.departure);
  }

  setDate(date: Date): void {
    switch (this.calendarMode) {
      case "arrival":
        this.booking.arrival = date;
        if (date.getTime() >= this.booking.departure.getTime() - 86400000) {
          this.booking.departure = new Date(this.booking.arrival.getFullYear(), this.booking.arrival.getMonth(), this.booking.arrival.getDate() + 1);
        }
        break;
      case "departure":
        this.booking.departure = date;
        if (date.getTime() < this.booking.arrival.getTime() + 86400000) {
          this.booking.arrival = new Date(this.booking.departure.getFullYear(), this.booking.departure.getMonth(), this.booking.departure.getDate() - 1);
        }
    }
    this.setPrice();
  }

  setPrice(): void {
    if ((this.booking.departure.getTime() - this.booking.arrival.getTime()) / 86400000 < 1) {
      this.booking.nights = 1;
    } else {
      this.booking.nights = Math.ceil((this.booking.departure.getTime() - this.booking.arrival.getTime()) / 86400000);
    }
    this.booking.price = this.booking.nights * 25000;
  }

  onCalendarDestroy(): void {
    this.arrivalCalendarActive = false;
    this.departureCalendarActive = false;
    this.showCalendar = false;
  }

  onSubmit(form: NgForm): void {
    this.bookingStage = "overview";
    console.log(this.booking);
  }

  onBack(): void {
    this.bookingStage = "form";
  }

  closeCalendar(): void {
    this.showCalendar = false;
    this.arrivalCalendarActive = false;
    this.departureCalendarActive = false;
  }

  ngOnInit() {
    this.booking.arrival.setDate(this.booking.arrival.getDate() + 1);
    this.booking.departure.setDate(this.booking.arrival.getDate() + 1);
    console.log(this.booking)
  }

}
