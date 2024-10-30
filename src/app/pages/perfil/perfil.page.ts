import { Component, OnInit } from '@angular/core';
import { API_CLINICA, RUTA_IMAGEN_USUARIO } from '../../constants/api-clinica.constante';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { EspecialidadesService } from '../../services/especialidades.service';
import { EspecialidadComponent } from "../../components/especialidad/especialidad.component";
import { Especialidad } from '../../interface/especialidad.interface';
import { FormatoDniPipe } from '../../pipes/formato-dni.pipe';
import { AgregarEspecialidadEspecialistaComponent } from "../../components/agregar-especialidad-especialista/agregar-especialidad-especialista.component";
import { EspecialidadesComponent } from "../../components/especialidades/especialidades.component";

@Component({
    selector: 'app-perfil',
    standalone: true,
    templateUrl: './perfil.page.html',
    styleUrl: './perfil.page.css',
    imports: [EspecialidadComponent, FormatoDniPipe, AgregarEspecialidadEspecialistaComponent, EspecialidadesComponent]
})
export class PerfilPage implements OnInit {

  mostrarEspecialidades:boolean = false;
  urlImagenUsuario: string = `${API_CLINICA}/${RUTA_IMAGEN_USUARIO}/`;
  usuario: any = {};

  constructor(private router:Router, private usuarioService: UsuarioService, private especialidadesService:EspecialidadesService) {}

  async ngOnInit(): Promise<void> 
  {
    try 
    {
      const json = JSON.parse(localStorage.getItem("usuario")!);
      const peticion = await this.usuarioService.obtenerUsuario(json.usuario.email, json.token);
      this.usuario = peticion.data;
      this.usuario.especialidades = await Promise.all( this.usuario.especialidades.map( async (especialidad:Especialidad) => {
        return await this.especialidadesService.obtenerEspecialidades(especialidad.especialidad);
      }));
      //console.log(this.usuario.especialidades);

    } 
    catch (e) 
    {
      console.log(e);
    }
  }

  obtenerEspecialidades(especialidad:Especialidad[])
  {
    this.mostrarEspecialidades = false;
    console.log(especialidad);
    console.log(this.usuario);
    this.especialidadesService.insertarEspecialidadEspecialista(especialidad[0], this.usuario._id, JSON.parse(localStorage.getItem("usuario")!).token)
  }


  getImagenUsuario(): string {
    return this.usuario.urlImagen 
      ? `${this.urlImagenUsuario}${this.usuario.urlImagen}` 
      : '../../../assets/usuario-default.png';
  }

  cerrarSesion()
  {
    localStorage.removeItem("usuario");
    this.router.navigateByUrl("/login");
  }

}
