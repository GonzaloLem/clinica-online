import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CLINICA } from '../constants/api-clinica.constante';
import { Peticion } from '../interface/peticion.interface';
import { firstValueFrom, map } from 'rxjs';
import { Horario } from '../interface/horario.interface';
import { Especialidad } from '../interface/especialidad.interface';
import { Disponibilidad } from '../interface/disponibilidad.interface';
import { Especialista } from '../interface/especialista.interface';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  constructor(private http:HttpClient) {}


  async obtenerHorarios(idEspecialista:string, idEspecialidad:string, token:string)
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return (await firstValueFrom(this.http.get<Peticion>(`${API_CLINICA}/disponibilidad/obtener/${idEspecialista}/${idEspecialidad}`, {headers}))).data.horarios as Horario[];
  }

  async obtenerHorariosObservable(idEspecialista:string, idEspecialidad:string, token:string)
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Peticion>(`${API_CLINICA}/disponibilidad/obtener/${idEspecialista}/${idEspecialidad}`, {headers}).pipe(map(peticon => peticon.data.horarios as Horario[]));
  }

  insertarEspecialidad(id_especialista:string, especialidad:Especialidad, token:string)
  {
    const formulario = new FormData();
    formulario.append("disponibilidad", JSON.stringify({
      id_especialista:id_especialista,
      id_especialidad:especialidad._id,
      horarios:especialidad.horarios
    }));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(`${API_CLINICA}/disponibilidad/insertar`, formulario, {headers:headers});
  }

  insertarHorario(id_especialista:string, especialidad:Especialidad, token:string) {
    const formulario = new FormData();
    console.log(especialidad);
    formulario.append("disponibilidad", JSON.stringify({
      id_especialista:id_especialista,
      id_especialidad:especialidad._id,
      horarios:especialidad.horarios
    }));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(`${API_CLINICA}/disponibilidad/agregar`, formulario, {headers:headers}).subscribe( response => {
      console.log(response);
    });
  }

  eliminarHorarioDeLaDisponibilidad(id_especialista:string, id_especialidad:string, id_horario:string, token:string)
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete(`${API_CLINICA}/disponibilidad/eliminar/${id_especialista}/${id_especialidad}/${id_horario}`, {headers:headers}).subscribe( response => {
      console.log(response);
    });
  }

  modificarDisponibilidad(disponibilidad:Disponibilidad, token:string){
    const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    const formulario = new FormData();
    formulario.append("disponibilidad", JSON.stringify({
      id:disponibilidad._id,
      id_especialista:disponibilidad.id_especialista,
      id_especialidad:disponibilidad.id_especialidad,
      horarios:disponibilidad.horarios
    }));
    this.http.post(`${API_CLINICA}/disponibilidad/modificar`, formulario, {headers:headers}).subscribe( (response) => {
      console.log(response);
    })
  }

  async obtenerEspecialistas(token:string, especialidad?:string)
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Peticion>(`${API_CLINICA}/usuario/especialista/obtener${especialidad?'/'+especialidad:''}`, {headers:headers}).pipe(map(peticion => peticion.data as Especialista[]));
  }

  async verificarSiHayEspecialistas(token:string, especialidad:string)
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return await firstValueFrom(this.http.get<Peticion>(`${API_CLINICA}/usuario/especialista/obtener${'/'+especialidad}`, {headers:headers}).pipe(map(peticion =>  {
      if((peticion.data as Especialista[]).length > 0 ){
        return true;
      }
      return false;
    })));
  }

}
