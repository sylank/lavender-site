import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "house-chooser-button",
  templateUrl: "./house-chooser-button.component.pug",
  styleUrls: ["./house-chooser-button.component.sass"],
})
export class HouseChooserButtonComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;
  @Input() infoText: string;
  @Input() disabled: boolean;
  @Input() selected: boolean;

  @Output() buttonSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  click() {
    if (this.disabled === undefined || this.disabled == false) {
      this.buttonSelected.emit(this.name);
      this.selected = true;
    }
  }
}
