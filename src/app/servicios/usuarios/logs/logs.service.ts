import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class LogsService 
{

  constructor(private firestore:Firestore){}

  insertar(usuario:Usuario, horario:{dia:number,horario:number,minutos:number,mes:number,anio:number})
  {
    const coleccion = collection(this.firestore, "logs");

    addDoc(coleccion, 
    {
      usuario: {id:usuario.ID, nombre: usuario.Nombre, apellido: usuario.Apellido},
      ingreso:horario
    })

  }

  obtenerLogsFecha(mes:number): Observable<any> 
  {
    const coleccion = collection(this.firestore, 'logs');
    const queryTurno = query(coleccion, where('ingreso.mes', '==', mes));
    return collectionData(queryTurno, { idField: 'id' }) as Observable<any>;
  }

  obtenerLogs(): Observable<any> 
  {
    const coleccion = collection(this.firestore, 'logs');
    return collectionData(coleccion, { idField: 'id' });
  }
}
