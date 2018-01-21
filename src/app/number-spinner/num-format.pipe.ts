import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numFormat'
})
export class NumFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return Number(value).toFixed(5);
    }
    return value;
  }

}
