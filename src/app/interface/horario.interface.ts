import { Dia } from "../type";

export interface Horario {
    _id?:string;
    dia: Dia;
    entrada:string;
    salida:string;
}