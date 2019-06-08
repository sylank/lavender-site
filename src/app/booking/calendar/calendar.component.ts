import { Component, OnInit, HostListener, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Subscription } from 'rxjs';
import { CalendarHttpService } from 'src/app/shared/calendar.http.service';
import { ReservedRange } from './reserved.range';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.pug',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit, OnDestroy {

  constructor(private calendarService: CalendarService, private http: CalendarHttpService) { }

  public today = new Date();

  @Input() public currentYear = this.today.getFullYear();
  @Input() public currentMonth = this.today.getMonth();

  @Output() destroy = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<Date>();

  public selectedDay: number;

  public months = ['január',
                    'február',
                    'március',
                    'április',
                    'május',
                    'június',
                    'július',
                    'augusztus',
                    'szeptember',
                    'október',
                    'november',
                    'december'];

  public days = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
  public weeksInMonth = [1, 2, 3, 4, 5, 6];
  public dayList: number[] = []; // Contains the list of days to display in a calendar month
  private updateCalendar: Subscription;

  showLoading = true;

  reservedRanges = [];

  reserved: Subscription;

  displayDaysInMonth(year: number, month: number): void {
    // Calculate the number of days in month
    const daysInMonth: number = 32 - new Date(year, month, 32).getDate();

    // Calculate the date of the first day of the month
    const firstDay: number = new Date(year, month, 1).getDay();

    // Fill daysList with the proper numbers
    this.dayList = [];
    for (let i = 0; i < 42; i++) {
      if (firstDay === 0) { // If the first day of the month is Sunday
        if (i < 6 || i >= daysInMonth + 6) {
          this.dayList[i] = null;
        } else {
          this.dayList[i] = i - 5;
        }
      } else { // If the first day of the month is NOT Sunday
        if (i < firstDay - 1 || i > daysInMonth + firstDay - 2) {
        this.dayList[i] = null;
        } else {
          this.dayList[i] = i - firstDay + 2;
        }
      }
    }
  }

  public nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.selectedDay = undefined;
    this.displayDaysInMonth(this.currentYear, this.currentMonth);
    this.showBookedDays(this.currentYear, this.currentMonth);
  }

  public prevMonth(): void {
    if (this.currentYear === this.today.getFullYear() && this.currentMonth === this.today.getMonth()) {
      return;
    }
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.selectedDay = undefined;
    this.displayDaysInMonth(this.currentYear, this.currentMonth);
    this.showBookedDays(this.currentYear, this.currentMonth);
  }

  submitDate(event: any, date: number): void {
    if (!event.target.innerText || event.target.classList.contains('disabled')) {
      this.destroy.emit(false);
      return;
    }
    if (this.selectedDay === undefined) {
      this.selectedDay = date;
    } else {
      this.selectedDay = undefined;
    }
    if (this.selectedDay) {
      const submitDate = new Date(this.currentYear, this.currentMonth, this.selectedDay);
      this.submit.emit(submitDate);
    }
    this.destroy.emit(false);
  }

  @HostListener('click', ['$event']) hostClick = (event) => {
    event.stopPropagation();
  }

  private generateBookedDaysList(reservedDates: any) {
    reservedDates.forEach((reserved: any) => {
      const from = this.dateConverter(reserved.fromDate);
      const to = this.dateConverter(reserved.toDate);
      const range = new ReservedRange(this.generateReservedRange(from, to), reserved.temporary);
      this.reservedRanges.push(range);
    });
    this.calendarService.disableDays.next(this.reservedRanges);
  }

  private dateConverter(date: string): Date {
    const year = Number(date.substr(0, 4));
    const month = Number(date.substr(5, 2)) - 1;
    const day = Number(date.substr(8, 2));
    return new Date(year, month, day);
  }

  private generateReservedRange(from: Date, to: Date) {
    const reservedRange = [];
    const fromMonth = from.getMonth();
    const toMonth = to.getMonth();
    const fromDate = from.getDate();
    const toDate = to.getDate();

    if (fromMonth === toMonth) {
      for (let i = fromDate; i <= toDate; i++) {
        reservedRange.push(i);
      }
    } else if (fromMonth === this.currentMonth) {
      const daysInMonth: number = 32 - new Date(from.getFullYear(), fromMonth, 32).getDate();
      for (let i = fromDate; i <= daysInMonth; i++) {
        reservedRange.push(i);
      }
    } else if (toMonth === this.currentMonth) {
      for (let i = 1; i <= toDate; i++) {
        reservedRange.push(i);
      }
    }
    return reservedRange;
  }

  private showBookedDays(year: number, month: number) {
    this.showLoading = true;

    this.reserved = this.http.checkAvailabilityInMonth(year, month).subscribe((reservedDates: any) => {
      this.reservedRanges = [];
      this.generateBookedDaysList(this.reservedRanges);
      this.generateBookedDaysList(reservedDates.response.reservations);

      this.showLoading = false;
    });
  }

  ngOnInit() {
    this.displayDaysInMonth(this.currentYear, this.currentMonth);
    this.updateCalendar = this.calendarService.updateCalendar.subscribe((date: Date) => {
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth();
      this.displayDaysInMonth(this.currentYear, this.currentMonth);
    });

    this.showBookedDays(this.currentYear, this.currentMonth);
  }

  ngOnDestroy() {
    this.updateCalendar.unsubscribe();
    this.reserved.unsubscribe();
  }

}
