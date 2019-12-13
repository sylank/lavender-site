import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { LanguageService } from './language.service';

@Directive({
  selector: '[translate]'
})
export class TranslateDirective implements OnInit {

  @Input() key: string

  constructor(private elementRef: ElementRef, private languageService: LanguageService) { }

  ngOnInit(): void {
    const pathElements = this.key.split('.')
    this.languageService.getTranslation().subscribe(
      (value: any) => {
        var val = pathElements.reduce((o, n) => o[n], value)
        this.elementRef.nativeElement.innerText = val;
      }
    );
  }
}
