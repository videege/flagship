import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numerals'
})
export class NumeralsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (isNaN(value)) return '';

    // Simple transform for numbers 1 -10
    switch (<number>value) {
      case 1: return "I";
      case 2: return "II";
      case 3: return "III";
      case 4: return "IV";
      case 5: return "V";
      case 6: return "VI";
      case 7: return "VII";
      case 8: return "VIII";
      case 9: return "IX";
      case 10: return "X";
    }

    return '';
  }

}
