import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-number-chooser',
  templateUrl: './number-chooser.component.pug',
  styleUrls: ['./number-chooser.component.sass']
})
export class NumberChooserComponent implements OnInit {

  @Input() minimumNumber: number
  @Input() maximumNumber: number
  @Input() selectedIndex: number
  @Output() selectedIndexChange = new EventEmitter();

  public numbers: number[]

  constructor() {  }

  ngOnInit() {
    this.numbers = new Array()
    for (let i=this.minimumNumber ; i<this.maximumNumber; i++) {
      this.numbers.push(i)
    }
  }

  selected(index: number) {
    this.selectedIndex = index
    this.selectedIndexChange.emit(this.selectedIndex);
  }

  @Input()
  get selectedIdx() {
    return this.selectedIndex;
  }

  set selectedIdx(val) {
    this.selectedIndex = val;
    this.selectedIndexChange.emit(this.selectedIndex);
  }

  sel(val: number) {
    this.selectedIdx = val
  }
}
