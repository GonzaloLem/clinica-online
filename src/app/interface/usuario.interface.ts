import { Tipo } from "../type";
import { Foto } from "./foto.interface";

export interface Usuario {
    _id?:string,
    nombre?:string,
    apellido?:string,
    dni?:string,
    edad?:number,
    email?:string,
    password?:string,
    foto?:Foto,
    tipo?:Tipo,
    urlImagen?:string,
    __t?:string
    __v?:number
}