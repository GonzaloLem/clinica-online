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

  constructor(private servicioUsuarios:UsuariosService) {}

  ngOnInit(): void 
  {
    (this.servicioUsuarios.obtenerEspecialidades() as Observable<any>).subscribe( (especialidades:any)=>{
      this.especialidades = especialidades;
    });
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
