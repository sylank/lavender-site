import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "submit-button",
  templateUrl: "./submit-button.component.pug",
  styleUrls: ["./submit-button.component.sass"],
})
export class SubmitButtonComponent implements OnInit {
  @Input()
  submitDisabled: boolean;

  @Input()
  caption: string;

  constructor() {}

  ngOnInit(): void {}
}
