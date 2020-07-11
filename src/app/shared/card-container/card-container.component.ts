import { Component, OnInit, Input } from "@angular/core";
import { LanguageService } from "../language.service";

@Component({
  selector: "card-container",
  templateUrl: "./card-container.component.pug",
  styleUrls: ["./card-container.component.sass"],
})
export class CardContainerComponent implements OnInit {
  @Input() title: string;
  @Input() titleStyle: string;
  @Input() translateKey: string;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    if (this.translateKey) {
      this.languageService
        .observer()
        .subscribe((event: string) => this.refreshTitleText());
    }
  }

  refreshTitleText() {
    this.languageService.getTranslation().subscribe((translations: any) => {
      this.title = this.languageService.getValueByKey(
        this.translateKey,
        translations
      );
    });
  }
}
