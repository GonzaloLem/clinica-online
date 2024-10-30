import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EspecialidadesService } from '../../services/especialidades.service';
import { Especialidad } from '../../interface/especialidad.interface';
import { API_CLINICA, RUTA_IMAGEN_ESPECIALIDAD } from '../../constants/api-clinica.constante';
import { TitleCasePipe } from '@angular/common';
import { EspecialistaService } from '../../services/especialista.service';
import { USUARIO_LOCAL_STORAGE } from '../../constants/usuario.constante';

@Component({
  selector: 'app-listado-especialidades',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './listado-especialidades.component.html',
  styleUrl: './listado-especialidades.component.css'
})
export class ListadoEspecialidadesComponent implements OnInit{

  @Output() outPutEspecialidad = new EventEmitter<Especialidad>();
  especialidades:Especialidad[] = [];
  rutaImagenesEspecialidades = `${API_CLINICA}/${RUTA_IMAGEN_ESPECIALIDAD}/`;

  constructor(private especialidadesService:EspecialidadesService, private especialistasService:EspecialistaService) {}

  async ngOnInit(): Promise<void> {
    const especialidades = await this.especialidadesService.obtenerEspecialidades() as Especialidad[];
    
    const promises = especialidades.map(async especialidad => {
      const tieneEspecialistas = await this.especialistasService.verificarSiHayEspecialistas(USUARIO_LOCAL_STORAGE.token, especialidad._id);
      return { especialidad, tieneEspecialistas };
    });
    const resultados = await Promise.all(promises);
    this.especialidades = resultados
      .filter(resultado => resultado.tieneEspecialistas)
      .map(resultado => resultado.especialidad);
  }

  outEspecialidad(especialidad:Especialidad)
  {
    this.outPutEspecialidad.emit(especialidad);
  }

}
