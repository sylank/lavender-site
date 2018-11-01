import { Directive, HostListener, ElementRef, HostBinding, OnInit, AfterViewInit } from '@angular/core';
import { CalendarService } from './calendar.service';

@Directive({
  selector: '[dayFormatter]'
})
export class DayFormatterDirective implements OnInit {

  constructor(private element: ElementRef, private calendarService: CalendarService) { }


  @HostListener("click") onClick = () => {
    if (!this.element.nativeElement.innerText) { return };

    if (this.element.nativeElement.classList.contains("disabled")) {
      return;
    }

    console.log(this.element.nativeElement.innerText);
    this.calendarService.clearSelectedDate.next();
    this.selected = !this.selected;
  }

  /*@HostBinding("class.validDay") get validDay() {
    if (this.element.nativeElement.innerText) {
      return true;
    } else {
      return false;
    }
  }*/

  @HostBinding("class.selected") selected: boolean = false;
  @HostBinding("class.disabled") disabled: boolean = false;

  ngOnInit() {
    this.calendarService.clearSelectedDate.subscribe(() => {
      this.selected = false;
    });
    
  }

  ngAfterViewInit() {
    console.log(this.element.nativeElement.innerText);
    this.calendarService.beforeToday.subscribe((currentDate: any) => {
      const date = new Date();
      //console.log(Number(this.element.nativeElement.innerText), date.getDate());
        if (currentDate.currentYear === date.getFullYear() &&
          currentDate.currentMonth === date.getMonth() &&
          this.element.nativeElement.innerText == 19) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }

    })
  }

}
