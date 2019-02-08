import { Component, OnInit, HostBinding, Input } from '@angular/core';
import DistanceUtils from '../distance-utils';

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

}
