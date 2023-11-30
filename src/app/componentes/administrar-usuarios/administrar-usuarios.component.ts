import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { PERFILES } from 'src/app/constantes/perfil.constante';
import { ArchivosService } from 'src/app/servicios/descargar/archivos/archivos.service';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css'],
  animations: [
    trigger("enterState", [
      state("void", style({
        transform: "translateY(100%)",
        opacity:0
      })),      
      transition(":enter", [
        animate(500,style({
          transform: "translateY(0)",
          opacity:1
        }))
      ])
    ])],
})
export class AdministrarUsuariosComponent implements OnInit
{
  private listado:any;
  administrador:boolean = false;
  datosUsuarioBasicos:any;

  constructor(private servicioUsuarios:UsuariosService, private servicioArchivos:ArchivosService){}
  
  ngOnInit(): void 
  {
    this.servicioUsuarios.obtenerUsuarios().subscribe((usuarios: any) => 
    {
      this.listado = usuarios.filter((usuario: any) => usuario.perfil !== PERFILES[2]);
      console.log(this.listado);
    });    
  }


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

  descargar()
  {
    this.servicioArchivos.descargarExelUsuarios(this.listado);
  }

  
}
