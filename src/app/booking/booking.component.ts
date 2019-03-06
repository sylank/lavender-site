import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar/calendar.service';
import {
  NgForm,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { CalendarHttpService } from '../shared/calendar.http.service';
import { Booking } from './booking.model';
import { CustomValidator } from '../shared/validators/email.validator';
import { Router, NavigationEnd } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { BookingData } from './booking.data';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.pug',
  styleUrls: ['./booking.component.sass']
})
export class BookingComponent implements OnInit {

  siteKey = '6LfhH5UUAAAAAIPkIxC6e8SmerK17bNnCjgL8nPD';

  navigationSubscription: any;

  private calendarMode: 'arrival' | 'departure' = 'arrival';
  private showCalendar = false;
  private arrivalCalendarActive = false;
  private departureCalendarActive = false;
  private calendarInitDate: Date; // To determine which date the calendar should open up with
  private bookingStage: 'form' | 'overview' | 'result' = 'form';
  private bookingResult: 'success' | 'failed' = 'failed';
  private messageLength = 300;
  reservedDates = [];

  private booking: Booking = {
    arrival: new Date(),
    departure: new Date(),
    nights: 1,
    price: 25000,
    name: '',
    phone: '',
    email: '',
    message: ''
  };
  formName: FormGroup;

  constructor(
    private calendarService: CalendarService,
    private calendarHttpService: CalendarHttpService,
    private fb: FormBuilder,
    private router: Router,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.bookingStage = 'form';
      }
    });
  }

  onMessageInput(): void {
    this.messageLength = 300 - this.formName.get('message').value.length;
  }

  toggleArrivalCalendar(event: PointerEvent): void {
    event.stopPropagation();
    this.departureCalendarActive = false;
    if (this.showCalendar && this.calendarMode === 'departure') {
      this.calendarMode = 'arrival';
    } else {
      this.showCalendar = !this.showCalendar;
    }
    this.calendarMode = 'arrival';
    this.calendarInitDate = this.booking.arrival;
    if (this.showCalendar && this.calendarMode === 'arrival') {
      this.arrivalCalendarActive = true;
    } else {
      this.arrivalCalendarActive = false;
    }
    this.calendarService.setSelectedDate(this.booking.arrival);
    this.calendarService.updateCalendar.next(this.booking.arrival);
    this.calendarService.reservedDates.next(this.reservedDates);
  }

  toggleDepartureCalendar(event: PointerEvent): void {
    event.stopPropagation();
    this.arrivalCalendarActive = false;
    if (this.showCalendar && this.calendarMode === 'arrival') {
      this.calendarMode = 'departure';
    } else {
      this.showCalendar = !this.showCalendar;
    }
    this.calendarMode = 'departure';
    this.calendarInitDate = this.booking.departure;
    if (this.showCalendar && this.calendarMode === 'departure') {
      this.departureCalendarActive = true;
    } else {
      this.departureCalendarActive = false;
    }
    this.calendarService.setSelectedDate(this.booking.departure);
    this.calendarService.updateCalendar.next(this.booking.departure);
    this.calendarService.reservedDates.next(this.reservedDates);
  }

  setDate(date: Date): void {
    switch (this.calendarMode) {
      case 'arrival':
        this.booking.arrival = date;
        if (date.getTime() >= this.booking.departure.getTime() - 86400000) {
          this.booking.departure = new Date(
            this.booking.arrival.getFullYear(),
            this.booking.arrival.getMonth(),
            this.booking.arrival.getDate() + 1
          );
        }
        break;
      case 'departure':
        this.booking.departure = date;
        if (date.getTime() < this.booking.arrival.getTime() + 86400000) {
          this.booking.arrival = new Date(
            this.booking.departure.getFullYear(),
            this.booking.departure.getMonth(),
            this.booking.departure.getDate() - 1
          );
        }
    }
    this.setPrice();
    this.calendarHttpService
      .getReservedDates(this.booking.arrival, this.booking.departure)
      .subscribe((reservedDates: any) => {
        this.reservedDates = reservedDates.response.reservations;
        console.log(this.reservedDates);
      });
  }

  setPrice(): void {
    if (
      (this.booking.departure.getTime() - this.booking.arrival.getTime()) /
        86400000 <
      1
    ) {
      this.booking.nights = 1;
    } else {
      this.booking.nights = Math.ceil(
        (this.booking.departure.getTime() - this.booking.arrival.getTime()) /
          86400000
      );
    }
    this.booking.price = this.booking.nights * 25000;
  }

  onCalendarDestroy(): void {
    this.arrivalCalendarActive = false;
    this.departureCalendarActive = false;
    this.showCalendar = false;
  }

  onSubmit(form: NgForm): void {
    this.bookingStage = 'overview';
    console.log(this.booking);
  }

  sendBooking() {
    this.reCaptchaV3Service.execute(this.siteKey, 'booking', (token) => {
      const bookingData = new BookingData(this.booking.email,
                                          this.booking.message,
                                          this.booking.arrival,
                                          this.booking.departure,
                                          this.booking.name,
                                          this.booking.phone);

      this.calendarHttpService.submitBooking(bookingData, token).subscribe((bookingResult: any) => {
        console.log(bookingResult);

        this.bookingStage = 'result';

        const data = bookingResult.response;
        if (data.enabled === true && data.reservationCause === 'SUCCESS') {
          this.bookingStage = 'result';
          this.bookingResult = 'success';

          return;
        }

        this.bookingResult = 'failed';
      });
    }, {
        useGlobalDomain: false
    });
  }

  onBack(): void {
    this.bookingStage = 'form';
  }

  closeCalendar(): void {
    this.showCalendar = false;
    this.arrivalCalendarActive = false;
    this.departureCalendarActive = false;
  }

  dateFormat(date: Date): string {
    let month: any = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  }

  formatCurrency(amount: number) {
    let returnData = String(amount);
    const thousandIndex = returnData.length - 3;
    const millionIndex = returnData.length - 6;

    // 100 000, 10 000, 1 000
    if (amount > 1000) {
      returnData = [
        returnData.slice(0, thousandIndex),
        ' ',
        returnData.slice(thousandIndex)
      ].join('');
    }

    // 100 000 000, 10 000 000, 1 000 000
    if (amount > 1000000) {
      returnData = [
        returnData.slice(0, millionIndex),
        ' ',
        returnData.slice(millionIndex)
      ].join('');
    }

    return returnData;
  }

  ngOnInit() {
    this.formName = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidator.emailValidator]],
      message: ['', []]
    });
    this.booking.arrival.setDate(this.booking.arrival.getDate() + 1);
    this.booking.departure.setDate(this.booking.departure.getDate() + 2);

    this.calendarHttpService
      .getReservedDates(this.booking.arrival, this.booking.departure)
      .subscribe((reservedDates: any) => {
        this.reservedDates = reservedDates.response.reservations;
      });

    this.reCaptchaV3Service.execute(this.siteKey, 'booking', (token) => {
      // console.log('This is your token: ', token);
    }, {
        useGlobalDomain: false
    });
  }

  getMonthNameById(id: number) {
    return Constants.months[id];
  }

  handleReset() {
    console.log('handleReset');
  }

  handleReady() {
    console.log('handleReady');
  }

  handleLoad() {
    console.log('handleLoad');
  }

  handleSuccess(event) {
    console.log('handleSuccess: ' + event);
  }
}
