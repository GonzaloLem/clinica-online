import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {

  transform(value: string): unknown 
  {
    let retorno:string = value;

    if (value.length >= 3) 
    {
      return value.slice(0, 2) + ':' + value.slice(3);
    }

    return retorno;
  }

}
