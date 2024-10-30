import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router';
import { Tipo } from '../../type';
import { NgClass, NgStyle, TitleCasePipe } from '@angular/common';
import { EspecialidadesComponent } from "../../components/especialidades/especialidades.component";
import { Especialidad } from '../../interface/especialidad.interface';

@Component({
    selector: 'app-registro',
    standalone: true,
    templateUrl: './registro.page.html',
    styleUrl: './registro.page.css',
    imports: [ReactiveFormsModule, TitleCasePipe, NgStyle, NgClass, EspecialidadesComponent, TitleCasePipe]
})
export class RegistroPage 
{
  formulario:FormGroup;

  ocultarModalEspecialidades:boolean = true;
  mostrarListadoUsuarios:boolean = false;
  tipo:Tipo = "paciente";
  especialidades:Especialidad[] = [];
  
  constructor(private formBuilder:FormBuilder, private autenticacion:AutenticacionService, private router:Router)
  {
    this.formulario = this.formBuilder.group({
      "txtNombre": new FormControl('',[Validators.required]),
      "txtApellido": new FormControl('',[Validators.required]),
      "txtDni": new FormControl('',[Validators.required]),
      "txtEdad": new FormControl('',[Validators.required]),
      "txtEmail": new FormControl('',[Validators.required, Validators.email]),
      "txtPassword": new FormControl('',[Validators.required]),
      "txtObraSocial": new FormControl('',[Validators.required])
    });
  }

  async registro()
  {
    if(this.formulario.valid)
    {
      const peticion = await this.autenticacion.iniciarSesion(this.formulario.get("txtEmail")?.value, this.formulario.get("txtPassword")?.value);

        if(peticion.status)
        {
          
        }
    }
  }

  cambiarTipo()
  {
    this.tipo = this.tipo === "paciente"? "especialista":"paciente";
  }

  obtenerEspecialidades(especialidades:Especialidad[])
  {
    this.especialidades = especialidades;
    this.ocultarModalEspecialidades = true;

  }
}
