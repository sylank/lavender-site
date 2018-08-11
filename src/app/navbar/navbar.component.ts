import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  background: boolean = false;

  changeBg() {
    window.scrollY > 100 ? this.background = true : this.background = false;
  }

  ngOnInit() {
  }

}
