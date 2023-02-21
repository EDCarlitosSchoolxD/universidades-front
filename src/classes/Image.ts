type ImageT = {
    id?:number|null,
    ruta?:string,
    tipo?:string,
    nombre?:string,
    encode?:string,

}

export class Image{
    private id?:number|null = null;
    private ruta?:string = "";
    private tipo?:string = "";
    private nombre?:string = "";
    private encode?:string = "";

    constructor(image:ImageT){
        this.id = image.id;
        this.ruta = image.ruta;
        this.tipo = image.tipo;
        this.nombre = image.nombre;
        this.encode = image.encode;
    }

}