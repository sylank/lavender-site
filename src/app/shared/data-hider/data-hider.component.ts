import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-hider',
  templateUrl: './data-hider.component.pug',
  styleUrls: ['./data-hider.component.sass']
})
export class DataHiderComponent implements OnInit {

  @Input()
  private defaultValue: string;

  @Input()
  private realValue: string;

  public showValue = false;

  constructor() { }

  ngOnInit() {
  }

}
