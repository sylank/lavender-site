import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public updateCalendar = new Subject<Date>();
  public selectedDate: Date = null;
  public reservedDates = new Subject();
  public disableDays = new Subject<number[]>();

  public setSelectedDate(date: Date): void {
    this.selectedDate = date;
  }
}
