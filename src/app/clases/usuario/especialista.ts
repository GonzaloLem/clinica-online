import { Usuario } from "./usuario";

export class Especialista extends Usuario
{
    private especialidad:string[];
    private cuentaActivada:boolean;

    constructor(mail:string, password:string, nombre?:string, apellido?:string, edad?:number, dni?:string, imagenPerfil?:any[], especialidad?:string[],id?:string|number, cuentaActivada?:boolean)
    {
        super(mail, password, nombre, apellido, edad, dni, imagenPerfil, id);
    
        this.especialidad = especialidad??[];
        this.cuentaActivada = cuentaActivada??false;
    }

    public set CuentaActivada(valor:boolean)
    {
        this.cuentaActivada = valor;
    }

    public get CuentaActivada():boolean
    {
        return this.cuentaActivada;
    }
    
    public get Especialidad():string[]
    {
        return this.especialidad;
    }

    public override JSON():any
    {
        return JSON.parse(JSON.stringify(
            {
                nombre:this.Nombre,
                apellido:this.Apellido,
                edad:this.Edad,
                dni:this.DNI,
                mail:this.Mail,
                password:this.Password,
                especialidad:this.especialidad,
                cuentaActivada:this.cuentaActivada
            }
        ));
    }

}
