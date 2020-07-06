import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "card-container",
  templateUrl: "./card-container.component.pug",
  styleUrls: ["./card-container.component.sass"],
})
export class CardContainerComponent implements OnInit {
  @Input() title: string;
  @Input() titleStyle: string;

  constructor() {}

  ngOnInit(): void {}
}
