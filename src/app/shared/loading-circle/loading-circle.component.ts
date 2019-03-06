import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-loading-circle',
  templateUrl: './loading-circle.component.pug',
  styleUrls: ['./loading-circle.component.sass']
})
export class LoadingCircleComponent implements OnInit {

  @Input()
  public show;

  @HostBinding('class.showTopTriangle') showTopTriangle = true;

  constructor() { }

  ngOnInit() {
    if (this.show === 'true') {
      this.showTopTriangle = true;
    } else {
      this.showTopTriangle = false;
    }
  }

}
