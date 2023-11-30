import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-listado-especialidades',
  templateUrl: './listado-especialidades.component.html',
  styleUrls: ['./listado-especialidades.component.css']
})
export class ListadoEspecialidadesComponent implements OnInit
{
  @Output() outPutEspecialidad = new EventEmitter<string|null>();
  especialidades:any[] = [];
  especialidad:string|null = null;
  imagenes;

  constructor(private servicioUsuarios:UsuariosService) {}

  async ngOnInit(): Promise<void> 
  {
    (this.servicioUsuarios.obtenerEspecialidades() as Observable<any>).subscribe( (especialidades:any)=>{
      this.especialidades = especialidades;
    });
    this.imagenes = await this.servicioUsuarios.obtenerImagenesEspecialidades();
    for(let i= 0;i<this.especialidades.length;i++)
    {
      for(let imagen of this.imagenes)
      {
        if(imagen.path.split('/').pop().replace(/\.[^/.]+$/, '') === this.especialidades[i].especialidad.toLowerCase())
        {
          this.especialidades[i].img = imagen.url;
          break;
        }
        else
        {
          this.especialidades[i].img = this.imagenes[this.imagenes.findIndex(item => item.path === 'especialidades/especialidad.jpg')].url;
        }
      }
    }
  }


  obtenerEspecialidad(especialidad:string)
  {
    if(this.especialidad !== especialidad)
    {
      this.especialidad = especialidad;
      this.outPutEspecialidad.emit(especialidad);
    }
    else
    {
      this.especialidad = null;
      this.outPutEspecialidad.emit(null);
    }

  }

}
