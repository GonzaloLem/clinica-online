import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrar'
})
export class MostrarPipe implements PipeTransform {

  transform(hora:number): unknown 
  {

    return hora+":00";
  }

}
