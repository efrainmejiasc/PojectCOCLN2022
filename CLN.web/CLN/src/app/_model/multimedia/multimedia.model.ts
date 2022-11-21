import { Micrositio } from '../micrositios/micrositio.model';

export interface Multimedia {

    idMultimedia: number;
    path: string;
    idMultimediaTipo: number;
    idMicrositio: number;
    idUsuarioCreacion: number;
    fechaCreacion: Date;
    idUsuarioEdicion: number;
    fechaEdicion: Date;
    esBorrado: boolean;
    fechaPublicacion: Date;
    micrositio: Micrositio;

    // MultimediaTipo MultimediaTipo;
}