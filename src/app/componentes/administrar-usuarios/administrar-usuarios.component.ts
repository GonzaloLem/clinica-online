import { Component } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent 
{
  administrador:boolean = false;
  datosUsuarioBasicos:any;

  constructor(private servicioUsuarios:UsuariosService){}

  registrar()
  {
    if(this.datosUsuarioBasicos)
    {
      this.servicioUsuarios.insertar
      (
        new Usuario
        (
          this.datosUsuarioBasicos.email,
          this.datosUsuarioBasicos.password,
          this.datosUsuarioBasicos.nombre,
          this.datosUsuarioBasicos.apellido,
          this.datosUsuarioBasicos.edad,
          this.datosUsuarioBasicos.dni,
          this.datosUsuarioBasicos.imagen
        )
      );
    }
  }

  obtenerDatosUsuarioBasico(datos:any)
  {
    this.datosUsuarioBasicos = datos;
  }

  mostrarFormulario()
  {
    this.administrador = !this.administrador;
  }

  
}
