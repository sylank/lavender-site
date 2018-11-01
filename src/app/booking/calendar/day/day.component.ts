import { Component, OnInit, HostBinding, ElementRef, HostListener, Input, AfterContentChecked } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'calendar-day',
  template: '{{ content }}',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnInit {

  constructor(private element: ElementRef, private calendarService: CalendarService) { }

  @Input() content: number;
  @Input() currentDate: { currentYear: number, currentMonth: number };
  @HostBinding("class.selected") selected: boolean = false;
  @HostBinding("class.disabled") disabled: boolean = false;

  @HostListener("click") onClick = () => {
    if (!this.element.nativeElement.innerText || this.element.nativeElement.classList.contains("disabled")) {
      return;
    }
    this.calendarService.clearSelectedDate.next();
    this.selected = !this.selected;
  }

  checkDate(): void {
    const today = new Date();
    if (this.currentDate.currentYear === today.getFullYear() && this.currentDate.currentMonth === today.getMonth() && this.content === 12) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  ngOnInit() {
    this.calendarService.clearSelectedDate.subscribe(() => {
      this.selected = false;
    });
  }

  ngAfterContentChecked() {
    this.checkDate();
  }

}
