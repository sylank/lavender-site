import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { LanguageService } from './language.service';

@Directive({
  selector: '[translate]'
})
export class TranslateDirective implements OnInit {

  @Input() key: string
  @Input() destination: string

  constructor(private elementRef: ElementRef, private languageService: LanguageService) {
    this.languageService.observer().subscribe((event: string) => this.refreshComponentText())
  }

  ngOnInit(): void {
    this.refreshComponentText()
  }

  private refreshComponentText() {
    if (this.key !== undefined) {
      const pathElements = this.key.split('.')
      this.languageService.getTranslation().subscribe(
        (value: any) => {
          var val: string = pathElements.reduce((o, n) => o[n], value)
          if (val !== undefined && val.length != 0) {
            if (this.destination !== undefined && this.destination === 'placeholder') {
              this.elementRef.nativeElement.placeholder = val;
            } else {
              this.elementRef.nativeElement.innerHTML = val;
            }
          }
        }
      );
    }
  }
}
