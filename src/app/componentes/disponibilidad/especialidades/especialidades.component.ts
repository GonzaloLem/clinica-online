import { Component, EventEmitter, Output } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario/usuario';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent 
{

  @Output() outPutEspecialidad = new EventEmitter<string>();

  especialidades:any[] = Usuario.obtenerLocalStorage().datos.especialidad;
  especialidadd:string = "";

  obtenerEspecialidad(especialidad:string)
  {
    this.outPutEspecialidad.emit(especialidad);
    this.especialidadd = especialidad;
  }

}
