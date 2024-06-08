import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormatPipe',
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value == 'string') {
      value = value.replace(/\,/g, '');
    }
    return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }
}
