import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, setDoc, doc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PERFILES } from 'src/app/constantes/perfil.constante';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private firestore:Firestore) { }

  async insertar(turno:any)
  {
    const coleccion = collection(this.firestore, 'turnos');

    console.log(turno);
    const observable = await addDoc(coleccion, {
      especialista:turno.idEspecialista,
      fecha:turno.fecha,
      horario:turno.horario,
      mes:turno.mes,
      paciente:turno.idPaciente,
      especialidad:turno.especialidad,
      estado:turno.estado
    });


    return observable;
  }

  async modificarTurno(turno:any)
  {
    console.log("HOLA");
    const documentoRef = doc(this.firestore, 'turnos', turno.id);
    await setDoc(documentoRef, turno, { merge: true });
  }

  obtenerTurno(usuario?:any):Observable<any>
  {
    const coleccion = collection(this.firestore, 'turnos');
      if( usuario && (usuario.perfil === PERFILES[0]))
      {
        const queryTurno = query(coleccion, where('especialista', '==', usuario.id));
        return collectionData(queryTurno, { idField: 'id' }) as Observable<any>;
      }
      else if( usuario && (usuario.perfil === PERFILES[1]))
      {
        const queryTurno = query(coleccion, where('paciente', '==', usuario.id));
        return collectionData(queryTurno, { idField: 'id' }) as Observable<any>;
      }
    return collectionData(coleccion, { idField: 'id'}) as Observable<any>;

  }
}
