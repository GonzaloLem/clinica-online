import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EspecialidadesService } from '../../services/especialidades.service';
import { Especialidad } from '../../interface/especialidad.interface';
import {API_CLINICA, RUTA_IMAGEN_ESPECIALIDAD} from '../../constants/api-clinica.constante';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [NgClass],
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.css'
})
export class EspecialidadesComponent implements OnInit, OnChanges
{
  constructor(private especialidadesService:EspecialidadesService) {}

  @Output() outPutCerrarModal = new EventEmitter<boolean>();
  @Output() outPutEspecialidades = new EventEmitter<Especialidad[]>();

  especialidades:Especialidad[] = []
  urlEspecialidadImagen = `${API_CLINICA}/${RUTA_IMAGEN_ESPECIALIDAD}/`;

  @Input() seleccionarMultiples:boolean = true;
  @Input() especialidadesPreSeleccionadas:Especialidad[] = [];

  especialidadesSeleccionadas:Especialidad[] = [];

  async ngOnInit(): Promise<void> {
    this.especialidades = await this.especialidadesService.obtenerEspecialidades() as Especialidad[];
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes["especialidadesPreSeleccionadas"])
      {
        this.especialidadesSeleccionadas = this.especialidadesPreSeleccionadas; 
      }
  }
  
  seleccionarEspecialidad(especialidad:Especialidad)
  {
    const index = this.especialidadesSeleccionadas.findIndex(es => es._id === especialidad._id);
  
    if (index === -1) {
      if(this.seleccionarMultiples)
      {
        this.especialidadesSeleccionadas.push(especialidad);
      }
      else
      {
        this.especialidadesSeleccionadas = [];
        this.especialidadesSeleccionadas.push(especialidad);
      }
    } 
    else 
    {
      this.especialidadesSeleccionadas.splice(index, 1);
    }
  }

  estaSeleccionada(especialidad: Especialidad): boolean {
    return this.especialidadesSeleccionadas.some(es => es._id === especialidad._id);
  }

  outEspecialidades()
  {
    this.outPutEspecialidades.emit(this.especialidadesSeleccionadas);
  }

}
