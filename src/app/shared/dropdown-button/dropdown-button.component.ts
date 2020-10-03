import { Component, HostListener, Input, OnInit } from "@angular/core";

@Component({
  selector: "dropdown-button",
  templateUrl: "./dropdown-button.component.pug",
  styleUrls: ["./dropdown-button.component.sass"],
})
export class DropdownButtonComponent implements OnInit {
  @Input()
  public title: string;

  @Input()
  public translateKey: string;

  public showMenu: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  buttonClick(event) {
    this.showMenu = !this.showMenu;
    event.stopPropagation();
  }

  @HostListener("document:click", ["$event"])
  clickout(event) {
    if (this.showMenu) {
      this.showMenu = false;
    }
  }
}
