import { Component } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.pug",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  title = "lavender-site";

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga("set", "page", event.urlAfterRedirects);
        (<any>window).ga("send", "pageview");
      }
    });
  }

  expand(drawer: HTMLDivElement): void {
    drawer.style.flexBasis = "100%";
  }
}
