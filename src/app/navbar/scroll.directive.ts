import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor() { }

  @Input() background: boolean = false;

  @HostBinding("style.backgroundColor") bgColor: string = "blue";

  @HostListener("window:scroll") onScroll = () => {
    window.scrollY > 100 ? this.background = true : this.background = false;

  }

}
