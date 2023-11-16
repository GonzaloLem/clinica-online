import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit
{

  @Output() outPutHorario = new EventEmitter<any>();
  @Input() dia:string = "";
  @Input() emitir:boolean = true;

  entrada:string = "";
  salida:string = "";

  ngOnInit(): void 
  {
    setInterval(()=>{
      if(this.emitir)
      {
        this.outPutHorario.emit({dia:this.dia, entrada:this.entrada, salida:this.salida});
      }
    },1000);
  }

  formatoEntrada(valor:string)
  {
    this.entrada = valor;
      if (valor.length >= 3 && valor.indexOf(':') === -1) 
      {
        this.entrada = valor.slice(0, 2) + ':' + valor.slice(2);
      }

  }

  formatoSalida(valor:string)
  {
    this.salida = valor;
      if (valor.length >= 3 && valor.indexOf(':') === -1) 
      {
        this.salida = valor.slice(0, 2) + ':' + valor.slice(2);
      }

  }

}
