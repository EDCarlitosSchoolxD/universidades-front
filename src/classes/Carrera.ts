import { Image } from "./Image";
import { Universidad } from "./Universidad";

export class Carrera{
    public id:number|null = null;
    public nombre:string = "";
    public descripcion:string = "";
    public objetivo: string|null;
    public aprendizaje: string|null;
    public trabajo: string|null;
    public perfilIngreso:string|null;
    public perfilEgreso:string|null;
    public universidad:Universidad;
    public planEstudio:Image|null;

    constructor(args:{id:number|null, nombre:string,descripcion:string,objetivo:string|null,aprendizaje:string|null,trabajo:string|null,perfilIngreso:string|null,perfilEgreso:string|null,universidad:Universidad,planEstudio:Image|null}){
        this.id  = args.id || null;
        this.nombre = args.nombre;
        this.descripcion = args.descripcion;
        this.objetivo = args.objetivo || null;
        this.aprendizaje = args.aprendizaje || null;
        this.trabajo = args.trabajo || null;
        this.perfilIngreso = args.perfilIngreso || null;
        this.universidad = args.universidad || null;
        this.planEstudio= args.planEstudio || null;
        this.perfilEgreso = args.perfilEgreso || null;
        
    }
}