import { Component, OnInit, HostListener, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.pug',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit, OnDestroy {

  constructor(private calendarService: CalendarService) { }

  private today = new Date();
  @Input() public currentYear = this.today.getFullYear();
  @Input() public currentMonth = this.today.getMonth();
  private selectedDay: number;
  private months = ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"];
  private days = ["H", "K", "Sze", "Cs", "P", "Szo", "V"];
  private weeksInMonth = [1, 2, 3, 4, 5, 6]
  private dayList: number[] = []; // Contains the list of days to display in a calendar month
  private updateCalendar: Subscription;

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

  private nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.selectedDay = undefined;
    this.displayDaysInMonth(this.currentYear, this.currentMonth);
  }

  private prevMonth(): void {
    if (this.currentYear === this.today.getFullYear() && this.currentMonth === this.today.getMonth()) {
      return
    }
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.selectedDay = undefined;
    this.displayDaysInMonth(this.currentYear, this.currentMonth);
  }

  submitDate(event: any, date: number): void {
    if (!event.target.innerText || event.target.classList.contains("disabled")) { return };
    if (this.selectedDay === undefined) {
      this.selectedDay = date;
    } else {
      this.selectedDay = undefined;
    }
    if (this.selectedDay) {
      const date = new Date(this.currentYear, this.currentMonth, this.selectedDay);
      this.submit.emit(date);
      console.log(date);
    }
    this.destroy.emit(false);
  }

  @Output() destroy = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<Date>();

  @HostListener("click", ["$event"]) hostClick = (event) => {
    event.stopPropagation();
  }

  ngOnInit() {
    this.displayDaysInMonth(this.currentYear, this.currentMonth);
    this.updateCalendar = this.calendarService.updateCalendar.subscribe((date: Date) => {
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth();
      this.displayDaysInMonth(date.getFullYear(), date.getMonth());
    })
  }

  ngOnDestroy() {
    this.updateCalendar.unsubscribe();
  }

}
