import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanos'
})
export class BooleanosPipe implements PipeTransform {

  transform(value: boolean): unknown {
    return value?"Si":"No";
  }

}
