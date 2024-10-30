import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CLINICA } from '../constants/api-clinica.constante';
import { firstValueFrom } from 'rxjs';
import { Peticion } from '../interface/peticion.interface';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService 
{

  constructor(private http: HttpClient) { }

    async iniciarSesion(email:string, password:string):Promise<Peticion>
    {
      const formData = new FormData();

      formData.append("usuario", JSON.stringify({email:email, password:password}));
      return await firstValueFrom(this.http.post(`${API_CLINICA}/autenticacion/login`, formData)) as Peticion;
    }
}
