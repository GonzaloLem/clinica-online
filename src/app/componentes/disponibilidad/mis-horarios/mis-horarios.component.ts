import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { DIAS } from 'src/app/constantes/dias.constante';
import { EspecialistaDisponibilidadService } from 'src/app/servicios/disponibilidad/especialista-disponibilidad.service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.css']
})
export class MisHorariosComponent implements OnInit
{

  private especialista:any[] = []
  private idDisponibilidad:string|undefined = undefined;
  horarios:any[] = [];
  diasEspecialista:string[] = [];
  especialidad:string = "";
  especialidad_horario:any = {};

  guardar:boolean = true;

  constructor(private disponibilidadServicio:EspecialistaDisponibilidadService){}

  async ngOnInit(): Promise<void>
  {
    (await this.disponibilidadServicio.obtenerDisponibilidad(Usuario.obtenerLocalStorage().id)).subscribe( (especialista)=>{
      //console.log(this.buscarPorClave(especialista[0],"cardiologo"));
      if(especialista[0])
      {
        this.especialista = especialista[0];
        this.idDisponibilidad = especialista[0].id;
      }



       /*this.disponibilidadServicio.obtenerEspecialidades().subscribe( (especialidades)=>{
          for(let especialidad of especialidades)
          {
            let horarios = this.buscarPorClave(this.especialista, especialidad.especialidad.toLowerCase());
              if(horarios)
              {
                this.horarios.push(horarios);
              }
            
          }
          //console.log(this.horarios);
        });*/

    });

  }

  obtenerHorario(horario:any)
  {
    let encontrado:boolean = true;
      for(let i=0;i<this.horarios.length;i++)
      {
        if(this.horarios[i].dia === horario.dia)
        {
          this.horarios[i] = horario;
          encontrado = false;
          break;
        }
      }

      if(encontrado)
      {
        this.horarios.push(horario);
      }
    //console.log(this.horarios);
  }

  obtenerEspecialidad(especialidad:string)
  {
    this.especialidad = especialidad;
    this.horarios.splice(0, this.horarios.length);
    this.diasEspecialista.splice(0, this.diasEspecialista.length);
    this.guardar = true;
  }

  async guardarDisponibilidad()
  {

      this.guardar = false;

      (await this.disponibilidadServicio.obtenerDisponibilidad(Usuario.obtenerLocalStorage().id)).subscribe( (especialista)=>{
        if(especialista[0])
        {
          this.especialista = especialista[0];
          this.idDisponibilidad = especialista[0].id;
        } 
      });
      
      let hs:any = {};
      
      for(let i=0;i<this.horarios.length;i++)
      {
        console.log(this.horarios[i]);
        hs[this.horarios[i].dia] = 
        {
          entrada: this.horarios[i].entrada,
          salida: this.horarios[i].salida
        }

      }

    this.especialidad_horario[this.especialidad.toLowerCase()] = {horario: hs};
    this.especialidad_horario.id = Usuario.obtenerLocalStorage().id;

    this.disponibilidadServicio.insertarDisponibilidad(this.especialidad_horario, this.idDisponibilidad);
    this.horarios.splice(0, this.horarios.length);
    this.diasEspecialista.splice(0, this.diasEspecialista.length);
    this.guardar = true;


  }

  mostrarHorarioDia(dia:string)
  {
    if(this.diasEspecialista.indexOf(dia) === -1)
    {
      this.diasEspecialista.push(dia);
    }
    else
    {
      this.diasEspecialista.splice(this.diasEspecialista.indexOf(dia), 1);
    }
  }

  buscarPorClave(objeto:any, claveBuscada:any) 
  {
  for (const clave in objeto) 
  {
    if (objeto.hasOwnProperty(clave) && clave === claveBuscada) 
    {
      return objeto[clave];
    }
  }
  return null;
}
}
