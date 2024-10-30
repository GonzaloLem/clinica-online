import { Injectable } from '@angular/core';
import { Turno } from '../interface/turno.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CLINICA } from '../constants/api-clinica.constante';
import { Peticion } from '../interface/peticion.interface';
import { map } from 'rxjs';
import { parseISO, formatISO } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private http:HttpClient) { }

  insertarTurno(turno:Turno, token:string)
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const form = new FormData();
    form.append("turno", JSON.stringify(turno));
    this.http.post<Peticion>(`${API_CLINICA}/turno/insertar`, form ,{headers}).subscribe( (response) => {
      console.log(response);
    });
  }

  cancelarTurno(idTurno:string)
  {
    const form = new FormData();
    form.append("turno", JSON.stringify({_id:idTurno}));
    this.http.post<Peticion>(`${API_CLINICA}/turno/cancelar`, form ).subscribe( (response) => {
      console.log(response);
    });
  }

  obtenerTurnos(id:string,token:string)
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Peticion>(`${API_CLINICA}/turno/obtener/turnos/${id}`,{headers}).pipe(map(peticion => peticion.data as Turno[]));
  }

  obtenerTurnosPendientes(id:string,token:string)
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Peticion>(`${API_CLINICA}/turno/obtener/turnos/pendientes/${id}`,{headers}).pipe(
      map(peticion =>  (peticion.data).map((turno: { fecha: Date }) => {
        turno.fecha = new Date(turno.fecha);
        return turno;
      }))
    );
  }

  obtenerHistorialMedico(id:string)
  {
    return this.http.get<Peticion>(`${API_CLINICA}/turno/obtener/historial/${id}`).pipe(
      map(peticion =>  (peticion.data).map((turno: { fecha: Date }) => {
        turno.fecha = new Date(turno.fecha);
        return turno;
      }))
    );
  }

} 
