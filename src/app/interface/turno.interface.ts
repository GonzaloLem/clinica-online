import { Estado } from "../type";
import { Especialidad } from "./especialidad.interface";
import { Especialista } from "./especialista.interface";
import { Paciente } from "./paciente.interface";

export interface Turno {
    _id?:string;
    especialista?:Especialista;
    especialidad?:Especialidad;
    paciente?:Paciente;
    estado:Estado;
    fecha:Date;
    horario:Date|Date[];
};