import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, setDoc, doc, CollectionReference, QueryDocumentSnapshot, updateDoc} from '@angular/fire/firestore';
import { Storage, getDownloadURL, listAll, ref, uploadBytes } from '@angular/fire/storage';
import { Observable, firstValueFrom } from 'rxjs';
import { Especialista } from 'src/app/clases/usuario/especialista';
import { Paciente } from 'src/app/clases/usuario/paciente';
import { Usuario } from 'src/app/clases/usuario/usuario';
import { PERFILES } from 'src/app/constantes/perfil.constante';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore:Firestore, private storage:Storage){}

  async insertar(usuario:Usuario)
  {
    const coleccion = collection(this.firestore, 'usuarios');
    let className = PERFILES[2];

      if(usuario instanceof Especialista)
      {
        className = PERFILES[0];
      }
      else if(usuario instanceof Paciente)
      {
        className = PERFILES[1];
      }

    const observable = await addDoc(coleccion, {
      datos: usuario.JSON(),
      perfil: className !== PERFILES[2]?className:PERFILES[2]
    });

    this.insertar_imagen(usuario);


    return observable;
  }


  async activarCuenta(email: string) 
  {
    const queryEmail = query(collection(this.firestore, 'usuarios'), where('datos.mail', '==', email));
    const coleccion = collectionData(queryEmail, { idField: 'id' });
  
    const usuario = (await firstValueFrom(coleccion))[0]; 
  
    if (usuario) 
    {
      usuario['datos'].cuentaActivada = !usuario['datos'].cuentaActivada;
  
      const documentoRef = doc(this.firestore, 'usuarios', usuario["id"]);
  
      await updateDoc(documentoRef, usuario);
    }
  }


  private insertar_imagen(usuario:Usuario)
  {
    
      for(let i:number=0;i<usuario.ImagenPerfil.length;i++)
      {
        
        if(i === 0)
        {
          const imgRef = ref(this.storage, "usuarios/"+usuario.Mail);
          uploadBytes(imgRef, usuario.ImagenPerfil[i]);
        }
        else
        {
          const imgRef = ref(this.storage, "usuarios/"+'@'+usuario.Mail);
          uploadBytes(imgRef, usuario.ImagenPerfil[i]);
        }

      }
  }

  public async obtenerImagenes()
  {
    const imagenes:any[] = []
    const imagesRef = ref(this.storage, "usuarios");

    const lista = await listAll(imagesRef);

      for(const item of lista.items)
      {
        imagenes.push({path:item.fullPath, url: await getDownloadURL(item)});
      }
    return imagenes;
  }

  async verficarEmail(email: string): Promise<boolean> 
  {
    const queryEmail = query(collection(this.firestore, 'usuarios'), where('datos.mail', '==', email));
    const coleccion = await firstValueFrom(collectionData(queryEmail));
    console.log(coleccion);
    return coleccion !== null?coleccion.length > 0:false;
  }

  obtenerUsuarios(): Observable<any> 
  {
    const coleccion = collection(this.firestore, 'usuarios');
    return collectionData(coleccion, { idField: 'id' });
  }

  obtenerEspecialistas(especialidad:string)
  {
    const coleccion = collection(this.firestore, 'usuarios');

    const queryRef = query(coleccion,  where('perfil', '==', "Especialista"), where('datos.especialidad', 'array-contains', especialidad));

    return collectionData(queryRef, { idField: 'id' }) as Observable<any>;
    
  }
  

  obtenerEspecialidades(especialidad?:string): Promise<any> | Observable<any> 
  {
    const coleccion = collection(this.firestore, 'especialidades');
      if(especialidad)
      {
        const queryRef = query(coleccion, where('especialidad', '==', especialidad));
        return firstValueFrom(collectionData(queryRef, { idField: 'id' }) as Observable<any>);
      }
    return collectionData(coleccion, { idField: 'id' }) as Observable<any>;
  }

  public async obtenerImagenesEspecialidades()
  {
    const imagenes:any[] = []
    const imagesRef = ref(this.storage, "especialidades");

    const lista = await listAll(imagesRef);

      for(const item of lista.items)
      {
        imagenes.push({path:item.fullPath, url: await getDownloadURL(item)});
      }
    return imagenes;
  }
}
