import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReservedRange } from './reserved.range';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public updateCalendar = new Subject<Date>();
  public selectedDate: Date = null;
  public reservedDates = new Subject();
  public disableDays = new Subject<ReservedRange[]>();

  public setSelectedDate(date: Date): void {
    this.selectedDate = date;
  }
}
