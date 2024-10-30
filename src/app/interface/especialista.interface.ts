import { Usuario } from "./usuario.interface";

export interface Especialista extends Usuario {
    especialidades?:string[]
}