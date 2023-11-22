import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, setDoc, doc, CollectionReference, QueryDocumentSnapshot, updateDoc} from '@angular/fire/firestore';
import { Storage, getDownloadURL, listAll, ref, uploadBytes } from '@angular/fire/storage';
import { Observable, firstValueFrom } from 'rxjs';
import { PERFILES } from 'src/app/constantes/perfil.constante';

@Injectable({
  providedIn: 'root'
})
export class HistorialClinicoService {

  constructor(private firestore:Firestore){}

  insertar(historial:any)
  {
    const coleccion = collection(this.firestore, 'historial_clinico');

    addDoc(coleccion, {
      datos:historial.formulario,
      datosDinamicos:historial.formularioDinamico,
      paciente:historial.paciente,
      especialista:historial.especialista
    });
  }

  obtenerHistorialClinico(usuario:any): Observable<any> 
  {
    const coleccion = collection(this.firestore, 'historial_clinico');

    if( usuario && (usuario.perfil === PERFILES[0]))
    {
      const queryTurno = query(coleccion, where('especialista.id', '==', usuario.id));
      return collectionData(queryTurno, { idField: 'id' }) as Observable<any>;
    }
    else if( usuario && (usuario.perfil === PERFILES[1]))
    {
      const queryTurno = query(coleccion, where('paciente.id', '==', usuario.id));
      return collectionData(queryTurno, { idField: 'id' }) as Observable<any>;
    }
    return collectionData(coleccion, { idField: 'id' });
  }

  obtenerHistoriales(datos:any): Observable<any> 
  {
    const coleccion = collection(this.firestore, 'historial_clinico');
    const queryTurno = query(coleccion, where('paciente.id', '==', datos.idPaciente),where('especialista.id', '==', datos.idEspecialista));
    return collectionData(queryTurno, { idField: 'id' }) as Observable<any>;
  }

  obtenerHistorialesClinicos(): Observable<any> 
  {
    const coleccion = collection(this.firestore, 'historial_clinico');
    return collectionData(coleccion, { idField: 'id' });
  }
}
