export class Contenido {
    idContenido: number;
    titulo: string;
    descripcion: string;
    Estado: string;
    Biblioteca: string;
    Temas: [];
    Micrositios: [];
    NombreContenido: string;
}

export class ContenidoAsociado{
    idValor:Number;
    nombre:string;
    idValorPadre:number;
    Padre:string;
}
