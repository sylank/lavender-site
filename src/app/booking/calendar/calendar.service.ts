import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public updateCalendar = new Subject<Date>();
  public selectedDate: Date = null;

  public setSelectedDate(date: Date): void {
    this.selectedDate = date;
  }
}
