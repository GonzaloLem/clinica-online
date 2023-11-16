export class Usuario 
{
    private id:string|number;
    private mail:string;
    private password:string;
    private imagenPerfil:any[];

    private nombre:string;
    private apellido:string;
    private edad:number;
    private dni:string;

    constructor(mail:string, password:string, nombre?:string, apellido?:string, edad?:number, dni?:string, imagenPerfil?:any[], id?:string|number)
    {
        this.id = id??0;
        this.mail = mail;
        this.password = password;
        this.imagenPerfil = imagenPerfil??[];

        this.nombre = nombre??"";
        this.apellido = apellido??"";
        this.edad = edad??-1;
        this.dni = dni??"";
    }

    public get ID():string|number
    {
        return this.id;
    }

    public get Mail():string
    {
        return this.mail;
    }

    public get Password():string
    {
        return this.password;
    }

    public get ImagenPerfil():any
    {
        return this.imagenPerfil;
    }

    public get Nombre():string
    {
        return this.nombre;
    }

    public get Apellido():string
    {
        return this.apellido;
    }

    public get Edad():number
    {
        return this.edad;
    }

    public get DNI():string
    {
        return this.dni;
    }

    public JSON():any
    {
        return JSON.parse(JSON.stringify(
            {
                nombre:this.nombre,
                apellido:this.apellido,
                edad:this.edad,
                dni:this.dni,
                mail:this.mail,
                password:this.password
            }
        ));
    }

    public guardarLocalStorage():void
    {
        localStorage.setItem("usuario", JSON.stringify(this));
    }

    public static obtenerLocalStorage():any
    {
        return localStorage.getItem("usuario") !== null ? JSON.parse(localStorage.getItem("usuario")!): null;
    }

    public static verificarLocalStorage():boolean
    {
        return localStorage.getItem("usuario") !== null ? true:false;
    }

    public static eliminarLocalStorage():void
    {
        localStorage.removeItem("usuario");
    }
}
