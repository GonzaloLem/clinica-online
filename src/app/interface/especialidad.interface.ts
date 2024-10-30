import { Horario } from "./horario.interface"

export interface Especialidad {
    _id:string,
    especialidad:string,
    urlImagen?:string
    horarios?:Horario[];
}