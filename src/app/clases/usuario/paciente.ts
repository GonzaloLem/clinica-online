import { Usuario } from "./usuario";

export class Paciente extends Usuario 
{
    private obraSocial:string;
    private emailVerificado:boolean;

    constructor(mail:string, password:string, nombre?:string, apellido?:string, edad?:number, dni?:string, imagenPerfil?:any[], obraSocial?:string,id?:string|number, emailVerificado?:boolean)
    {
        super(mail, password, nombre, apellido, edad, dni, imagenPerfil, id);
    
        this.obraSocial = obraSocial??"";
        this.emailVerificado = emailVerificado??false;
    }

    public set MailVerificado(verificado:boolean)
    {
        this.emailVerificado = verificado;
    }

    public get ObraSocial():string
    {
        return this.obraSocial;
    }

    public get MailVerificado():boolean
    {
        return this.emailVerificado;
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
                obraSocial:this.obraSocial,
                emailVerificado:this.emailVerificado
            }
        ));
    }
}
