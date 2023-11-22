import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-turno',
  templateUrl: './formulario-turno.component.html',
  styleUrls: ['./formulario-turno.component.css']
})
export class FormularioTurnoComponent 
{
  @Output() outPutFormulario = new EventEmitter<any>();
  formulario: FormGroup;
  formularioDinamico: FormGroup|null = null;

  datosDinamico:any[] = [];

  constructor(private formBuilder:FormBuilder)
  {
    this.formulario = this.formBuilder.group
    ({
      txtPeso: ['', [Validators.required, Validators.minLength(1),Validators.pattern(/^[0-9]+$/)]],
      txtAltura: ['', [Validators.required, Validators.minLength(1),Validators.pattern(/^[0-9]+$/)]],
      txtTemperatura: ['', [Validators.required, Validators.minLength(1),Validators.pattern(/^[0-9]+$/)]],
      txtPresion: ['', [Validators.required, Validators.minLength(1),Validators.pattern(/^[0-9]+$/)]],
      txtComentario: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9ñÑ. ]+$/)]]
    });
  }


  aumentarIndiceDinamico()
  {
    if(this.datosDinamico.length < 3)
    {
      let jsonValidaciones:any = {};
      this.datosDinamico.push(
        {
          id:this.datosDinamico.length,
          clave:'',
          valor:undefined
        });

        for(let i = 0;i<this.datosDinamico.length;i++)
        {
          jsonValidaciones['dato'+i] = ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9ñÑ\s]+$/)]];
          jsonValidaciones['clave'+i] = ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9ñÑ\s]+$/)]];
        }
      this.formularioDinamico = this.formBuilder.group(jsonValidaciones);
    }
  }

  finalizar()
  {
    if(this.formulario.valid && (this.formularioDinamico === null || (this.formularioDinamico && this.formularioDinamico.valid)))
    {
      let jsonDinamico:any[]|null = null;
        if(this.formularioDinamico)
        {

          jsonDinamico = [];
          for(let i = 0;i<this.datosDinamico.length;i++)
          {
            jsonDinamico.push
            ({
              clave:this.formularioDinamico?.get("clave"+i)?.value,
              dato:this.formularioDinamico?.get("dato"+i)?.value
              });
          }
        }

      this.outPutFormulario.emit
      (
        {
          formulario:
          {
            peso:this.formulario.get("txtPeso")?.value,
            altura:this.formulario.get("txtAltura")?.value,
            temperatura:this.formulario.get("txtTemperatura")?.value,
            presion:this.formulario.get("txtPresion")?.value,
            comentario:this.formulario.get("txtComentario")?.value
          },
          formularioDinamico:jsonDinamico
        }
      );
    }
  }
}
