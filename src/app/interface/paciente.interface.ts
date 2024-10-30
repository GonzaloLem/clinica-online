import { Usuario } from "./usuario.interface";

export interface Paciente extends Usuario {
    obraSocial?:string
}