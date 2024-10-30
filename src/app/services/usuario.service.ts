import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CLINICA } from '../constants/api-clinica.constante';
import { firstValueFrom } from 'rxjs';
import { Peticion } from '../interface/peticion.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  async obtenerUsuario(identificador:string, token:string)
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return await firstValueFrom(this.http.get<Peticion>(`${API_CLINICA}/usuario/obtener/${identificador}`, {headers}), );
  }
}
