import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HORARIOS } from 'src/app/constantes/horarios.constante';
import { EspecialistaDisponibilidadService } from 'src/app/servicios/disponibilidad/especialista-disponibilidad.service';
import { HorariosService } from 'src/app/servicios/horarios/horarios.service';
import { Subscription } from 'rxjs';
import { TurnosService } from 'src/app/servicios/horarios/turnos.service';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { PERFILES } from 'src/app/constantes/perfil.constante';
import { ESTADO_TURNO } from 'src/app/constantes/estado-turno.constante';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaptchaService } from 'src/app/servicios/captcha/captcha.service';

@Component({
  selector: 'app-horarios-disponibles',
  templateUrl: './horarios-disponibles.component.html',
  styleUrls: ['./horarios-disponibles.component.css']
})



export class HorariosDisponiblesComponent implements OnChanges
{
  @Input() especialidad:any;
  @Input() especialista:any;

  formulario:FormGroup
  horarios:string[] = HORARIOS;
  dias:string[] = [];

  disponibilidad:any[][] = [];

  horariosDisponibles;

  turnoSeleccionado:any[] = [];
  casillaI:number = -1;
  casillaJ:number = -1;
  casillaMarcada:{i:number, j:number} = {i:-1,j:-1};

  siteKey:string = "6LcPXg4pAAAAAMpDgbKZlga8rAUTUL-zObx0EuhN";

  constructor(private formBuilder:FormBuilder, private horariosServicio:HorariosService, private servicioDisponibilidad:EspecialistaDisponibilidadService, private servicioTurno:TurnosService, private servicioCaptChap:CaptchaService)
  {
    this.servicioCaptChap.solicitarToken();
    this.formulario = this.formBuilder.group
    ({
      recaptcha: ['', Validators.required]
    });
  }

  mostrarHorariosDisponibles(i:number)
  {
    this.horariosDisponibles = this.disponibilidad[i];
    this.casillaI = i;
    console.log(this.horariosDisponibles);
  }

  seleccionarHorario(j:number)
  {
    this.casillaJ = j;
  }


  async ngOnChanges(changes: SimpleChanges): Promise<void> 
  {
    if(changes["especialista"])
    {
      (await this.servicioDisponibilidad.obtenerDisponibilidad(this.especialista.id)).subscribe( async (disponibilidad:any)=>{

        (this.servicioTurno.obtenerTurno({id:this.especialista.id, perfil:PERFILES[0]})).subscribe( async (turnos:any)=>{
          this.horariosServicio.armarHorarios(disponibilidad[0][this.especialidad.toLowerCase()],  turnos)
        
            this.disponibilidad = this.horariosServicio.Disponibilidad;
            this.dias = this.cantidadDias(this.disponibilidad);
            console.log(this.disponibilidad);
        });
      });
    }    
  }

  

  marcarTurno(i:number, j:number)
  {

    if(this.casillaMarcada.i !== i || this.casillaMarcada.j !== j ||(this.casillaMarcada.i === -1 && this.casillaMarcada.j === -1) )
    {
      this.turnoSeleccionado = [this.disponibilidad![i][j]];
      this.casillaMarcada.i = i;
      this.casillaMarcada.j = j;
    }
    else
    {
      this.turnoSeleccionado = [];
      this.casillaMarcada.i = -1;
      this.casillaMarcada.j = -1;
    }
  }

  sacarTurno()
  {
    this.casillaMarcada.i = this.casillaI;
    this.casillaMarcada.j = this.casillaJ;
    this.servicioTurno.insertar
    (

      {
        especialista:
          {
            id:this.especialista.id,
            nombre:this.especialista.datos.nombre,
            apellido:this.especialista.datos.apellido
          },
        fecha:this.disponibilidad![this.casillaMarcada.i][this.casillaMarcada.j].fecha,
        horario:parseInt(this.disponibilidad![this.casillaMarcada.i][this.casillaMarcada.j].horario),
        mes:this.disponibilidad![this.casillaMarcada.i][this.casillaMarcada.j].mes,
        paciente:
          {
            id:Usuario.obtenerLocalStorage().id,
            nombre:Usuario.obtenerLocalStorage().datos.nombre,
            apellido:Usuario.obtenerLocalStorage().datos.apellido
          },
        especialidad:this.especialidad,
        estado:ESTADO_TURNO[0]
      }
    );
    this.turnoSeleccionado = [];
    this.casillaMarcada.i = -1;
    this.casillaMarcada.j = -1;
  }

  cantidadDias(disponibilidad:any)
  {
    let retorno:string[] = []
    for(let dispo of disponibilidad)
    {
      let dia = this.horariosServicio.buscarDia(dispo[0].dia);
        if(dia)
        {
          retorno.push(dia);
        }
    }
    return retorno;
  }

  /*obtenerDisponibilidad()
  {
    let fechaEntrada = new Date();
    let fechaSalida = new Date();

    fechaEntrada.setHours(8,0,0,0);
    fechaSalida.setHours(13,0,0,0);

    for(let i=0;i<this.dias.length;i++)
    {
      let dia:any[] = [];
        for(let j=0;j<this.horarios.length;j++)
        {
          let horario = new Date();
          horario.setHours(parseInt(this.horarios[j], 10));
          if(horario >= fechaEntrada && horario <= fechaSalida)
          {
            dia.push({dia:this.dias[i], horario:this.horarios[j], disponible:true})
          }
          else
          {
            dia.push({dia:this.dias[i], horario:this.horarios[j], disponible:false})
          }

        }
      this.disponibilidad.push(dia);
    }
    console.log(this.disponibilidad);
  }*/

}
