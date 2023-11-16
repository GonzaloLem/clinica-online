import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit
{
  private timeOut:any;
  formulario: FormGroup;
  @Output() outPutPaciente = new EventEmitter<any>();


  constructor(private formBuilder:FormBuilder, private servicioUsuarios:UsuariosService)
  {
    this.timeOut = null;

      this.formulario = this.formBuilder.group
      ({
        txtObraSocial: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-Z ]+$/)]]
      });
  }
  ngOnInit(): void 
  {
    this.timeOut = setInterval(()=>{
      
      if(this.formulario.valid)
      {
        this.outPutPaciente.emit({obraSocial:this.formulario.get("txtObraSocial")?.value});
      }
      else
      {
        this.outPutPaciente.emit(null);
      }
    },1000);
  }

  

}
