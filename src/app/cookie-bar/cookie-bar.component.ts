import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-bar',
  templateUrl: './cookie-bar.component.pug',
  styleUrls: ['./cookie-bar.component.sass']
})
export class CookieBarComponent implements OnInit {

  showCookieBar: boolean = true;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    const cookieValue = this.cookieService.get('show-cookie-bar');
    console.log(cookieValue)
    if (cookieValue) {
      this.showCookieBar = (/true/i).test(cookieValue);
    }
  }

  public close() {
    this.showCookieBar = false
    console.log("bele")
    this.cookieService.set('show-cookie-bar', this.showCookieBar.toString());
  }
}
