import { Image } from "./Image";

export type EstadoT = {
    id?:number|null,
    nombre?:string,
    image?:Image,
}

export class Estado{
    private id?:number|null = null;
    private nombre?:string = "";
    private image?:Image = new Image({});


    constructor(estado:EstadoT){
        this.id = estado.id;
        this.nombre = estado.nombre
    }
   

    public getNombre():string{
        return this.nombre;
    }

}