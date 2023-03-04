type ImageT = {
    id?:number|null,
    ruta:string,
    tipo:string,
    nombre:string,
    encode:string,

}

export class Image{
    private id?: number | null | undefined = null;
    
    public ruta:string = "";
    private tipo:string = "";
    private nombre:string = "";
    public encode:string = "";

    constructor(image:ImageT){
        this.id = image.id;
        this.ruta = image.ruta;
        this.tipo = image.tipo;
        this.nombre = image.nombre;
        this.encode = image.encode;
    }
    
    public getRuta():string{
        return this.ruta;
    }
    public getEncode():string{
        return this.encode;
    }

}