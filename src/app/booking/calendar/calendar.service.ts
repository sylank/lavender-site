import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  clearSelectedDate = new Subject();

  beforeToday = new Subject();
}
