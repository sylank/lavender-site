import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StaticInformationHttpService } from '../static-information.http.service';

@Component({
  selector: 'app-data-hider',
  templateUrl: './data-hider.component.pug',
  styleUrls: ['./data-hider.component.sass']
})
export class DataHiderComponent implements OnInit {

  @Input()
  private defaultValue: string;

  @Input()
  private resolvDataFunction: Function;

  public realValue: string;
  public showValue = false;

  constructor(private staticInfoService: StaticInformationHttpService) { }

  ngOnInit() {
  }

  public retrieveRealValue() {
    this.showValue = false;
    // this.showLoading = true;

    this.staticInfoService.getStaticInformation().subscribe(
      (staticData: any) => {
        const data =  this.resolvDataFunction(staticData.response);

        this.realValue = data;
        this.showValue = true;
        // this.showLoading = false;
      }
    );
  }

}
