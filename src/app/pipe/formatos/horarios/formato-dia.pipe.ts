import { Pipe, PipeTransform } from '@angular/core';
import { DIAS } from 'src/app/constantes/dias.constante';

@Pipe({
  name: 'formatoDia'
})
export class FormatoDiaPipe implements PipeTransform {

  transform(value: number): string|null {
    let retorno = value.toString();

      if(value < 10)
      {
        retorno = '0'+value;
      }
/*
      switch(value)
      {
        case 0:
        case '0':
          retorno = DIAS[6];
        break;

        case 1:
        case '1':
          retorno = DIAS[0];
        break;

        case 2:
        case '2':
          retorno = DIAS[1];
        break;

        case 3:
        case '3':
          retorno = DIAS[2];
        break;

        case 4:
        case '4':
          retorno = DIAS[3];
        break;

        case 5:
        case '5':
          retorno = DIAS[4];
        break;

        case 6:
        case '6':
          retorno = DIAS[5];
        break;
      }*/

    return retorno;
  }

}
