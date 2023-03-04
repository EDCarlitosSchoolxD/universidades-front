import { Image } from "./Image";
import { Municipio } from "./Municipio";

export class Universidad{
    public id:number|null = null;
    public nombre:string = "";
    public likes:number = 0;
    public latitud:number|null;
    public longitud:number|null;
    public municipio:Municipio|null
    public image:Image|null;
    public slug:string;
    public web:string|null = null;

    constructor(args:{id:number|null,nombre:string,likes:number,latitud:number,longitud:number,municipio:Municipio|null,image:Image|null,slug:string,web:string|null}){
        this.id = args.id || null;
        this.nombre = args.nombre ;
        this.likes= args.likes;
        this.latitud = args.latitud || null;
        this.longitud = args.longitud || null;
        this.municipio = args.municipio || null;
        this.image = args.image || null;
        this.slug = args.slug;
        this.web = args.web || null;
    }

}