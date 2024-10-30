import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CLINICA } from '../constants/api-clinica.constante';
import { firstValueFrom } from 'rxjs';
import { Especialidad } from '../interface/especialidad.interface';
import { Peticion } from '../interface/peticion.interface';
import { Especialista } from '../interface/especialista.interface';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor(private http:HttpClient) {}

  async obtenerEspecialidades(especialidad?:string):Promise<Especialidad[]|Especialidad>
  {
    return (await firstValueFrom(this.http.get<Peticion>(`${API_CLINICA}/especialidad/obtener${especialidad?'/'+especialidad:''}`))).data;
  }


  insertarEspecialidadEspecialista(especialidad:Especialidad, idEspecialista:string|number, token:string)
  {
    const form = new FormData();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    form.append("especialidad",JSON.stringify(especialidad))
    console.log(token);
    this.http.post(`localhost:3001/usuario/especialista/insertar/especialidad/6663c6c9542e0fc1a0bb1557`,form, {headers:headers});
  }
}
