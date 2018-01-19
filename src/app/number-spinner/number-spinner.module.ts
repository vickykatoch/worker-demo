import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberSpinnerComponent } from './components/number-spinner.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NumberSpinnerComponent, 
    NumberOnlyDirective
  ],
  exports : [
    NumberSpinnerComponent, 
    NumberOnlyDirective
  ]
})
export class NumberSpinnerModule { }
