import {
  Component, OnInit, Input, Output, Optional, Inject,
  forwardRef, EventEmitter, ViewChild, ElementRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from '@angular/forms';
import { isNumber } from 'util';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent'
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';

const DEFAULT_DISPLAY_FORMAT = 'decimel';


@Component({
  selector: 'number-spinner',
  templateUrl: './number-spinner.component.html',
  styleUrls: ['./number-spinner.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberSpinnerComponent),
      multi: true
    }
  ],
})
export class NumberSpinnerComponent implements ControlValueAccessor {
  //#region Fields
  @Input() decimalPlaces = 0;
  @Input() step = 1;
  @Input() minValue = Number.NEGATIVE_INFINITY;
  @Input() maxValue = Number.POSITIVE_INFINITY;
  @ViewChild('input') inputElem: ElementRef;
  @Input() disabled = false;
  @Output() valueChanged = new EventEmitter<number>();
  @Input() displayFormat : string = DEFAULT_DISPLAY_FORMAT;

  private innerValue: number;
  displayValue = '';
  propagateChange: any = () => { };
  validateFn:any = () => {};
  private eventSubscription: Subscription;
  //#endregion

  //#region ctor
  constructor() {
  }
  //#endregion

  //#region ControlValueAccessor
  /**
     * Write a new value to the element.
     */
  writeValue(obj: any): void {
    if (obj) {
      this.innerValue = Number(obj);
      this.setFormattedValue();
    } else {
      this.displayValue = '';
      this.innerValue = undefined;
    }
  }
  /**
     * Set the function to be called 
     * when the control receives a change event.
     */
  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }
  /**
     * Set the function to be called 
     * when the control receives a touch event.
     */
  registerOnTouched(fn: any): void {
  }
  /**
     * This function is called by the forms API when the control status changes to
     * or from "DISABLED". Depending on the value, it should enable or disable the
     * appropriate DOM element.
     *
     * Example implementation of `setDisabledState`:
     *
     * ```ts
     * setDisabledState(isDisabled: boolean): void {
     *   this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
     * }
     * ```
     *
     * @param isDisabled
     */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  //#endregion

  //#region Custom Behavior
  onUp() {
    if (isNumber(this.innerValue)) {
      const incrementedValue = this.innerValue + this.step;
      this.innerValue = incrementedValue <= this.maxValue ? incrementedValue : this.maxValue;
      this.setFormattedValue();
      this.propagateChange(this.innerValue);
      this.valueChanged.next(this.innerValue);
    }
  }
  onDown() {
    if (isNumber(this.innerValue)) {
      const decrementedValue = this.innerValue - this.step;
      this.innerValue = decrementedValue >= this.minValue ? decrementedValue : this.minValue;
      this.setFormattedValue();
      this.propagateChange(this.innerValue);
      this.valueChanged.next(this.innerValue);
    }
  }
  //#endregion

  //#region Component Lifecycle hook
  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }
  ngOnInit() {
    this.eventSubscription = fromEvent(this.inputElem.nativeElement, 'change')
      .subscribe(this.onChange.bind(this));
  }

  //#endregion

  //#region Helper Methods
  private onChange(evt: any) {
    const numValue = Number(evt.srcElement.value);
    this.innerValue = numValue < this.minValue ? this.minValue : numValue > this.maxValue ? this.maxValue : numValue;
    this.setFormattedValue();
    this.propagateChange(this.innerValue);
    this.valueChanged.next(this.innerValue);
  }
  setFormattedValue() {
    const value = this.innerValue.toFixed(this.decimalPlaces);
    this.displayValue = this.displayFormat === DEFAULT_DISPLAY_FORMAT ? value : this.getFormattedValueTemp(this.innerValue);
    this.innerValue = Number(value);
  }
  getFormattedValueTemp(value: number) : string {
    const intPart = Math.floor(value);
    let decPart = ((value - intPart) * .32).toFixed(this.decimalPlaces);
    decPart = decPart.substr(decPart.indexOf('.')+1);
    return `${intPart}-${decPart}`;
  }
  //#endregion
}
