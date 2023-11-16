import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, setDoc, doc, CollectionReference, QueryDocumentSnapshot, updateDoc} from '@angular/fire/firestore';
import { Storage, getDownloadURL, listAll, ref, uploadBytes } from '@angular/fire/storage';
import { Observable, firstValueFrom } from 'rxjs';
import { Especialista } from 'src/app/clases/usuario/especialista';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaDisponibilidadService {

  constructor(private firestore:Firestore) { }

  async insertarDisponibilidad(disponibilidad:any, id?:string)
  {
    const coleccion = collection(this.firestore, 'disponibilidad');
      if(id)
      {
        const a = doc(coleccion, id);
       await updateDoc(a, disponibilidad);
      }
      else
      {
        addDoc(coleccion, disponibilidad);
      }
    
  }

  async obtenerDisponibilidad(id:string)
  {
    const coleccion = collection(this.firestore, 'disponibilidad');
    const queryEspecialista = query(coleccion, where('id', '==', id));

    return collectionData(queryEspecialista, { idField: 'id' }) as Observable<any>;
  }

  obtenerEspecialidades()
  {
    const coleccion = collection(this.firestore, 'especialidades');
    return collectionData(coleccion, { idField: 'id' }) as Observable<any>;
  }

}
