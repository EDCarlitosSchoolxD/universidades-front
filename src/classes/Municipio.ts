import { Estado } from "./Estado";
import { Image } from "./Image";

export class Municipio{

    public id: number | null = null;
    
    public nombre: string | undefined = "";
    
    public estado: Estado | null = null;
    
    private image: Image | null = null;
    


    constructor(args:{id:number|null,nombre:string,estado:Estado|null,image:Image|null}){
        this.id = args.id;
        this.nombre = args.nombre;
        this.estado = args.estado;
        this.image = args.image;
    }



    public getId(): number | null {
        return this.id;
    }
    public setId(value: number | null) {
        this.id = value;
    }

    public getNombre(): string | undefined {
        return this.nombre;
    }
    public setNombre(value: string | undefined) {
        this.nombre = value;
    }

    public getEstado(): Estado | null {
        return this.estado;
    }
    public setEstado(value: Estado | null) {
        this.estado = value;
    }

    public getImage(): Image | null {
        return this.image;
    }
    public setImage(value: Image | null) {
        this.image = value;
    }

}