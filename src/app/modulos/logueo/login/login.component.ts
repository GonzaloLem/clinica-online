import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { PERFILES } from 'src/app/constantes/perfil.constante';
import { LogsService } from 'src/app/servicios/usuarios/logs/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent 
{
  formulario: FormGroup;

  constructor(private router:Router,private formBuilder:FormBuilder, private servicioUsuarios:UsuariosService, private servicioLogs:LogsService)
  {
    this.formulario = this.formBuilder.group
    ({
      txtEmail: ['', [Validators.required, Validators.email]],
      txtPassword: ['', [Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-ZñÑ0-9]+$/)]]
    });
  }


  async login()
  {
    this.servicioUsuarios.obtenerUsuarios().subscribe( (usuarios)=>
    {
      for(let usuario of usuarios)
      {
        if(usuario.datos.mail ===  this.formulario.get("txtEmail")?.value && usuario.datos.password === this.formulario.get("txtPassword")?.value)
        {
          let fecha = new Date();
          if(usuario.perfil === PERFILES[0] && usuario.datos.cuentaActivada !== undefined && usuario.datos.cuentaActivada)
          {
            localStorage.setItem("usuario", JSON.stringify(usuario));
            this.servicioLogs.insertar
            (
              new Usuario(
                usuario.datos.mail,
                usuario.datos.password,
                usuario.datos.nombre,
                usuario.datos.apellido,
                usuario.datos.edad,
                usuario.datos.dni,
                [],
                usuario.id),
              {
                dia:fecha.getDate(),
                horario:fecha.getHours(),
                minutos:fecha.getMinutes(),
                mes:fecha.getMonth(),
                anio:fecha.getFullYear()
              }
            );
              console.log(fecha.getDate());
            this.router.navigate(["/bienvenido"]);
            break;
          }
          else if(usuario.perfil !== PERFILES[0])
          {
            localStorage.setItem("usuario", JSON.stringify(usuario));

            this.servicioLogs.insertar
            (
              new Usuario(
                usuario.datos.mail,
                usuario.datos.password,
                usuario.datos.nombre,
                usuario.datos.apellido,
                usuario.datos.edad,
                usuario.datos.dni,
                [],
                usuario.id),
              {
                dia:fecha.getDate(),
                horario:fecha.getHours(),
                minutos:fecha.getMinutes(),
                mes:fecha.getMonth(),
                anio:fecha.getFullYear()
              }
            );
            this.router.navigate(["/bienvenido"]);
            break;
          }

        }
      }
    });
  }

  autoLogin(usuario:any)
  {
    this.formulario.get("txtEmail")?.setValue(usuario.email);
    this.formulario.get("txtPassword")?.setValue(usuario.password);
  }
}
