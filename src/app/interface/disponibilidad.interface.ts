import { Horario } from "./horario.interface";

export interface Disponibilidad {

    _id?:string,
    id_especialidad:string,
    id_especialista:string,
    horarios:Horario[]
    
}