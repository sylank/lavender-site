import { Component, OnInit, HostBinding, Input } from '@angular/core';
import DistanceUtils from '../distance-utils';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'event-record',
  templateUrl: './event.component.pug',
  styleUrls: ['./event.component.sass']
})
export class EventComponent implements OnInit {
  WALK_DISTANCE = 5;
  BIKE_DISTANCE = 20;
  CAR_DISTANCE = 999;

  @Input() fromDate: String;
  @Input() toDate: String;
  @Input() eventName: String;
  @Input() eventLocation: String;
  @Input() distance: number;
  @Input() important: boolean;
  @Input() description: String;

  @HostBinding('class.walk-color') walkColor = false;
  @HostBinding('class.bike-color') bikeColor = false;
  @HostBinding('class.car-color') carColor = false;

  constructor() { }

  ngOnInit() {
    this.setDistanceColor();
  }

  setDistanceColor() {
    if (DistanceUtils.isWalkDistance(this.distance)) {
      this.walkColor = true;
      return;
    }

    if (DistanceUtils.isBikeDistance(this.distance)) {
      this.bikeColor = true;
      return;
    }

    if (DistanceUtils.isCarDistance(this.distance)) {
      this.carColor = true;
      return;
    }

  }

  getMonthName(date: String) {
    const str: string = String(date);
    const dateObj = new Date(str);

    return Constants.months[dateObj.getMonth()];
  }

  getDay(date: String) {
    const str: string = String(date);
    const dateObj = new Date(str);
    return dateObj.getDate();
  }

  getTitle() {
    return this.eventName.split('#')[0];
  }

  getLocation() {
    return this.eventLocation.split('\n').join('+');
  }

}
