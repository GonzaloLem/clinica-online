import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horaPMAM'
})
export class HoraPMAMPipe implements PipeTransform {

  transform(value: string,): string {
    let retorno = value+" AM";

    switch(value.substring(0, 2))
    {
      case "13":
        retorno = "1"+value.slice(2)+"PM";
      break;
      case "14":
        retorno = "2"+value.slice(2)+"PM";
      break;
      case "15":
        retorno = "3"+value.slice(2)+"PM";
      break;
      case "16":
        retorno = "4"+value.slice(2)+"PM";
      break;
      case "17":
        retorno = "5"+value.slice(2)+"PM";
      break;
      case "18":
        retorno = "6"+value.slice(2)+"PM";
      break;
      case "19":
        retorno = "7"+value.slice(2)+"PM";
      break;
      case "20":
        retorno = "8"+value.slice(2)+"PM";
      break;
      case "21":
        retorno = "9"+value.slice(2)+"PM";
      break;
      case "22":
        retorno = "10"+value.slice(2)+"PM";
      break;
      case "23":
        retorno = "11"+value.slice(2)+"PM";
      break;
      case "24":
        retorno = "12"+value.slice(2)+"PM";
      break;
    }

    return retorno;
  }

}
