import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoDni',
  standalone: true
})
export class FormatoDniPipe implements PipeTransform {

  transform(value: string | number): string {
    if (!value) {
      return '';
    }

    // Convert the value to a string
    let dniString = value.toString();

    // Ensure the string only contains numbers
    dniString = dniString.replace(/\D/g, '');

    // Use a regular expression to format the string with dots
    return dniString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
