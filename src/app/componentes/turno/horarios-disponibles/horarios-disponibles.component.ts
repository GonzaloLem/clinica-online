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



export class HorariosDisponiblesComponent implements OnInit, OnChanges
{
  @Input() especialidad:any;
  @Input() especialista:any;

  formulario:FormGroup
  horarios:string[] = HORARIOS;
  dias:string[] = [];

  disponibilidad:any[][] = [];

  turnoSeleccionado:any[] = [];
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

  
  ngOnInit(): void 
  {
    
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> 
  {
    if(changes["especialista"])
    {

      (await this.servicioDisponibilidad.obtenerDisponibilidad(this.especialista.id)).subscribe( async (disponibilidad:any)=>{

        (await this.servicioTurno.obtenerTurno({id:this.especialista.id, perfil:PERFILES[0]})).subscribe( async (turnos:any)=>{
          console.log(turnos);
          this.horariosServicio.armarHorarios(disponibilidad[0][this.especialidad.toLowerCase()],  turnos)
        
            this.disponibilidad = this.horariosServicio.Disponibilidad;
            this.dias = this.cantidadDias(this.disponibilidad);

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
    console.log(this.turnoSeleccionado);
  }

  sacarTurno()
  {

    this.servicioTurno.insertar
    (
      {
        idEspecialista:this.especialista.id,
        fecha:this.disponibilidad![this.casillaMarcada.i][this.casillaMarcada.j].fecha,
        horario:parseInt(this.disponibilidad![this.casillaMarcada.i][this.casillaMarcada.j].horario),
        mes:this.disponibilidad![this.casillaMarcada.i][this.casillaMarcada.j].mes,
        idPaciente:Usuario.obtenerLocalStorage().id,
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
