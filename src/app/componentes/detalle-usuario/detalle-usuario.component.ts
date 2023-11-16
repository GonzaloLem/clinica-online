import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/clases/usuario/especialista';
import { Paciente } from 'src/app/clases/usuario/paciente';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { PERFILES } from 'src/app/constantes/perfil.constante';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit
{
  usuario:Usuario|null = null;

  constructor(private servicioUsuarios:UsuariosService){}

  async ngOnInit(): Promise<void> 
  {
    const imagenes:any[] = await this.servicioUsuarios.obtenerImagenes();


      this.servicioUsuarios.obtenerUsuarios().subscribe( (usuarios:any)=>{
        for(let user of usuarios)
        {
          if(user.id === Usuario.obtenerLocalStorage().id)
          {
            this.crearUsuario(user, imagenes);
          }
        }
      });
  }

  private crearUsuario(user:any, imagenes:any[])
  {
    if(user.perfil === PERFILES[0])
    {
      this.usuario = new Especialista
      (
        user.datos.mail,
        user.datos.password,
        user.datos.nombre,
        user.datos.apellido,
        user.datos.edad,
        user.datos.dni,
        this.buscarFotoUsuario(user.datos.mail, imagenes),
        user.datos.especialidad,
        user.id
      );
    }
    else if(user.perfil === PERFILES[1])
    {
      this.usuario = new Paciente
      (
        user.datos.mail,
        user.datos.password,
        user.datos.nombre,
        user.datos.apellido,
        user.datos.edad,
        user.datos.dni,
        this.buscarFotoUsuario(user.datos.mail, imagenes),
        user.datos.obraSocial,
        user.id
      );
    }
    else
    {
      this.usuario = new Usuario
      (
        user.datos.mail,
        user.datos.password,
        user.datos.nombre,
        user.datos.apellido,
        user.datos.edad,
        user.datos.dni,
        this.buscarFotoUsuario(user.datos.mail, imagenes)
      );
    }
  }

  private buscarFotoUsuario(mail:string, imagenes:any[])
  {
    let retorno:any[] = [];

    for(let imagen of imagenes)
    {
      if(imagen.path.replace("usuarios/","") === mail || imagen.path.replace("usuarios/@","") === mail)
      {
        retorno.push(imagen.url);
      }
    }
    return retorno;
  }
}
