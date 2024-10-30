import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoAmPm',
  standalone: true
})
export class FormatoAmPmPipe implements PipeTransform {

  transform(value: string|null): string {
    if (!value) {
      return '';
    }

    // Asegúrate de que el valor tenga el formato HH:MM
    const timeParts = value.split(':');
    if (timeParts.length !== 2) {
      return value; // Devuelve el valor original si el formato no es correcto
    }

    let hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];

    if (isNaN(hours)) {
      return value; // Devuelve el valor original si las horas no son un número válido
    }

    const suffix = hours >= 12 ? 'PM' : 'AM';

    // Asegúrate de que las horas tengan dos dígitos
    const formattedHours = hours < 10 ? '0' + hours : hours.toString();

    return `${formattedHours}:${minutes} ${suffix}`;
  }

}
