import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";

@Component({
  selector: "notification-dialog",
  templateUrl: "./notification-dialog.component.pug",
  styleUrls: ["./notification-dialog.component.sass"],
})
export class NotificationDialogComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  titleTranslateKey: string;

  @Output()
  closeButtonClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleClose() {
    this.closeButtonClicked.emit(false);
  }

  stopPropogation(event: PointerEvent) {
    event.stopPropagation();
  }

  @HostListener("document:keydown.escape", ["$event"]) onEscKeyDownHandler(
    event: KeyboardEvent
  ) {
    this.handleClose();
  }
}
