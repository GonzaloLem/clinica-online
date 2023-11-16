import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DIAS } from 'src/app/constantes/dias.constante';

@Component({
  selector: 'app-dias',
  templateUrl: './dias.component.html',
  styleUrls: ['./dias.component.css']
})
export class DiasComponent 
{
  @Input() marcado:string[] = [];
  @Output() outPutDia = new EventEmitter<string>();
  dias:any[] = DIAS;



  obtenerdia(dia:string)
  {
    this.outPutDia.emit(dia);
  }

  buscarMarcado(dia:string)
  {
    let retorno:boolean = false;

      for(let item of this.marcado)
      {
        if(item === dia)
        {
          retorno = true;
          break;
        }
      }

    return retorno;
  }

}
