import { Component, OnInit, Input, Output } from '@angular/core';


@Component({
  selector: 'number-spinner',
  templateUrl: './number-spinner.component.html',
  styleUrls: ['./number-spinner.component.scss']
})
export class NumberSpinnerComponent implements OnInit {

  @Input() value : number;
  displayValue : string = '10';

  constructor() { }

  ngOnInit() {
    
  }

  //#region Event Handlers
  onUp() {
    console.log('Up');
  }
  onDown() {
    console.log('Down');
  }
  //#endregion
}
