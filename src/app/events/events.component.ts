import { Component, OnInit } from '@angular/core';
import DistanceUtils from './distance-utils';
import { EventHttpService } from '../shared/event.http.service';
import { HttpUtils } from '../shared/http.utils';
import { GoogleAnalyticsService } from '../shared/google-analytics.service';
import { GoogleAnalyticsConstants } from '../shared/google.analytics.constants';

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

  constructor(private eventsHttpService: EventHttpService, private googleAnalyticsService: GoogleAnalyticsService) { }

  ngOnInit() {
    this.filterArrayById(-1);

    this.showLoading = true;
    this.eventsHttpService.getEventsByFromDateAndToDate(new Date(), HttpUtils.getEndOfTheYear(), 999).subscribe(
      (queriedEvents: any) => {
        this.eventsList = queriedEvents.response.events;
        this.filterArrayById(-1);

        this.showLoading = false;
      }
    );
  }

  filterArrayById(id: number) {
    if (id === 1) {
      this.filteredData = this.eventsList.filter(item => DistanceUtils.isWalkDistance(item.distance));

      this.googleAnalyticsService.eventEmitter(
        GoogleAnalyticsConstants.WALK_FILTER_EVENT,
        GoogleAnalyticsConstants.TRUE_ACTION,
        '',
        1)
      return;
    }

    if (id === 2) {
      this.filteredData = this.eventsList.filter(item => DistanceUtils.isBikeDistance(item.distance));

      this.googleAnalyticsService.eventEmitter(
        GoogleAnalyticsConstants.BICYCLE_FILTER_EVENT,
        GoogleAnalyticsConstants.TRUE_ACTION,
        '',
        1)
      return;
    }

    if (id === 3) {
      this.filteredData = this.eventsList.filter(item => DistanceUtils.isCarDistance(item.distance));

      this.googleAnalyticsService.eventEmitter(
        GoogleAnalyticsConstants.CAR_FILTER_EVENT,
        GoogleAnalyticsConstants.TRUE_ACTION,
        '',
        1)
      return;
    }

    this.filteredData = this.eventsList;
  }
}
