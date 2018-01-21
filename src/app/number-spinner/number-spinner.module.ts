import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberSpinnerComponent } from './components/number-spinner.component';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { FormsModule } from '@angular/forms';
import { NumFormatPipe } from './num-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NumberSpinnerComponent, 
    NumberOnlyDirective,
    NumFormatPipe
  ],
  exports : [
    NumberSpinnerComponent, 
    NumberOnlyDirective,
    NumFormatPipe
  ]
})
export class NumberSpinnerModule { }
