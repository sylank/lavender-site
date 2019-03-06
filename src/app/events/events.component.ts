import { Component, OnInit } from '@angular/core';
import DistanceUtils from './distance-utils';
import { EventHttpService } from '../shared/event.http.service';
import { HttpUtils } from '../shared/http.utils';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.pug',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  public eventsList = [];

  public filteredData = [];

  public showLoading = true;

  selectedButtonIdx = 0;

  constructor(private eventsHttpService: EventHttpService) { }

  ngOnInit() {
    this.filterArrayById(-1);

    this.showLoading = true;
    this.eventsHttpService.getEventsByFromDateAndToDate(new Date(), HttpUtils.getEndOfTheYear(), 999).subscribe(
      (queriedEvents: any) => {
        console.log(queriedEvents);
        this.eventsList = queriedEvents.response.events;
        this.filterArrayById(-1);

        this.showLoading = false;
      }
    );
  }

  filterArrayById(id: number) {
    if (id === 1) {
      this.filteredData = this.eventsList.filter(item => DistanceUtils.isWalkDistance(item.distance));
      return;
    }

    if (id === 2) {
      this.filteredData = this.eventsList.filter(item => DistanceUtils.isBikeDistance(item.distance));
      return;
    }

    if (id === 3) {
      this.filteredData = this.eventsList.filter(item => DistanceUtils.isCarDistance(item.distance));
      return;
    }

    this.filteredData = this.eventsList;
  }
}
