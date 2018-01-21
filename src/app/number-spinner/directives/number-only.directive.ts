import { Directive, HostListener } from '@angular/core';


@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective {
  private acceptableCharCodes = new Map<number, string>();
  constructor() {
    for(let i=48;i<=57;i++) {
      this.acceptableCharCodes.set(i, i.toString());
    }  
    this.acceptableCharCodes.set(46, 'Decimal Character');
    this.acceptableCharCodes.set(45, 'Minus Character');
  }

  @HostListener('keypress', ['$event'])
  onKeypress(evt: KeyboardEvent) {
    if(!this.acceptableCharCodes.has(evt.keyCode)) {
      evt.returnValue=false;
    }
  }
  @HostListener('paste', ['$event'])
  onPaste(evt: ClipboardEvent) {
    const pastedData = evt.clipboardData.getData('text');
    for(let i = 0;i<pastedData.length;i++) {
      if(!this.acceptableCharCodes.has(pastedData.charCodeAt(i))) {
        evt.returnValue = false;
        evt.preventDefault();
        break;
      }
    }
  }
}
