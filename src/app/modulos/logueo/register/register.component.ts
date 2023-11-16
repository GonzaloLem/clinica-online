import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/usuario/especialista';
import { Paciente } from 'src/app/clases/usuario/paciente';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { PERFILES } from 'src/app/constantes/perfil.constante';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuarioPerfil:boolean;
  especialista:boolean
  paciente:boolean
  perfil:string|null = null;
  minimoFotos:number = 1;

  datosUsuarioBasicos:any;
  datosPerfil:any;

  constructor(private router:Router, private servicioUsuarios:UsuariosService)
  {
    this.usuarioPerfil = false;
    this.especialista = false;
    this.paciente = false;

    this.datosUsuarioBasicos = null;
    this.datosPerfil = null;
  }

  obtenerDatosUsuarioBasico(datos:any)
  {
    this.datosUsuarioBasicos = datos;
  }

  obtenerDatosPerfil(datos:any)
  {
    this.datosPerfil = datos;
  }

  async registrarUsuario()
  {

    if(this.datosUsuarioBasicos && this.datosPerfil)
    {
      if(this.datosUsuarioBasicos.perfil === PERFILES[0]  && !await this.servicioUsuarios.verficarEmail(this.datosUsuarioBasicos.email))
      {
        this.servicioUsuarios.insertar
        (
          new Especialista
            (
              this.datosUsuarioBasicos.email,
              this.datosUsuarioBasicos.password,
              this.datosUsuarioBasicos.nombre,
              this.datosUsuarioBasicos.apellido,
              this.datosUsuarioBasicos.edad,
              this.datosUsuarioBasicos.dni,
              this.datosUsuarioBasicos.imagen,
              this.datosPerfil.especialidad
            )
        );

      }
      else if(this.datosUsuarioBasicos.perfil === PERFILES[1] && !await this.servicioUsuarios.verficarEmail(this.datosUsuarioBasicos.email))
      {
       this.servicioUsuarios.insertar
       (
        new Paciente
          (
            this.datosUsuarioBasicos.email,
            this.datosUsuarioBasicos.password,
            this.datosUsuarioBasicos.nombre,
            this.datosUsuarioBasicos.apellido,
            this.datosUsuarioBasicos.edad,
            this.datosUsuarioBasicos.dni,
            this.datosUsuarioBasicos.imagen,
            this.datosPerfil.obraSocial
          )
        );
        this.loguear();

      }
    }
  }

  loguear()
  {
    this.servicioUsuarios.obtenerUsuarios().subscribe( (usuarios)=>
    {
      for(let usuario of usuarios)
      {
        if(usuario.datos.mail ===  this.datosUsuarioBasicos.email && usuario.datos.password === this.datosUsuarioBasicos.password)
        {
          if(usuario.perfil === PERFILES[0] && usuario.datos.cuentaActivada !== undefined && usuario.datos.cuentaActivada)
          {
            Usuario.eliminarLocalStorage();
            localStorage.setItem("usuario", JSON.stringify(usuario));
            this.router.navigate(["/bienvenido"]);
            break;
          }
          else if(usuario.perfil !== PERFILES[0])
          {
            Usuario.eliminarLocalStorage();
            localStorage.setItem("usuario", JSON.stringify(usuario));
            this.router.navigate(["/bienvenido"]);
            break;
          }

        }
      }
    });
  }

  setearPerfil(perfil:string)
  {
    this.perfil = perfil;
      this.minimoFotos = 1;
      if(perfil === PERFILES[1])
      {
        this.usuarioPerfil = true;
        this.minimoFotos = 2;
        this.paciente = true;
        this.especialista = false;
      }
      else
      {
        this.usuarioPerfil = true;
        this.especialista = true;
        this.paciente = false;
      }
  }

  volver()
  {
    this.perfil = null;
    this.usuarioPerfil = false;
    this.especialista = false;
    this.paciente = false;
  }

  /*mostrarPerfilEspecialista(mostrar:boolean)
  {
    this.usuarioPerfil = true;
    this.especialista = mostrar;
    this.paciente = false;
  }

  mostrarPerfilPaciente(mostrar:boolean)
  {
    this.usuarioPerfil = true;
    this.paciente = mostrar;
    this.especialista = false;
  }*/
}
