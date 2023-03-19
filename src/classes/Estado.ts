import { Image } from "./Image";



export class Estado{
    public id:number|null = null;
    public nombre:string = "";
    public image:Image|null = null;
    public slug:String = "";


    constructor(args:{id:number|null,nombre:string,image:Image|null,slug:String}){
        this.id = args.id;
        this.nombre = args.nombre;
        this.image = args.image;
        this.slug = args.slug;
    }
   

    public getNombre():string{
        return this.nombre;
    }
    public setNombre(nombre:string){
        this.nombre = nombre
    }

    public getId():number|null{
        return this.id;
    }
    public setId(id:number){
        this.id = id;
    }

    public getImage():Image|null{
        return this.image;
    }

}