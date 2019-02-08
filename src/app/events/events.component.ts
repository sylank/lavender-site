import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
import DistanceUtils from './distance-utils';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.pug',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  public tmpData =
    [
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Az első esemény 1234',
        'eventLocation': '1144 Budapest, Viola utca',
        'distance': 2
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '2019.11.07',
        'eventName': 'Rövid esemény',
        'eventLocation': '1144 Budapest',
        'distance': 30
      },
      {
        'fromDate': '2018.09.26',
        'toDate': '',
        'eventName': 'A leghosszabb esemény amin voltam',
        'eventLocation': '1144 Budapest',
        'distance': 55
      }
    ];

  public filteredData = [];

  selectedButtonIdx = 0;

  constructor() { }

  ngOnInit() {
    this.filterArrayById(-1);
  }

  filterArrayById(id: number) {
    if (id === 1) {
      this.filteredData = this.tmpData.filter(item => DistanceUtils.isWalkDistance(item.distance));
      return;
    }

    if (id === 2) {
      this.filteredData = this.tmpData.filter(item => DistanceUtils.isBikeDistance(item.distance));
      return;
    }

    if (id === 3) {
      this.filteredData = this.tmpData.filter(item => DistanceUtils.isCarDistance(item.distance));
      return;
    }

    this.filteredData = this.tmpData;
  }
}
