export class Evento {
    id: number;
    nombre: string;
    descripcion: string;
    fechaEvento: Date;
    horaInicio: string;
    horaFin: string;
    direccion: string;
    repetir: boolean;
    privado: boolean;
    tipoEvento: number;
    tipoColor: string;
    tipoDesc: string;
    notificacion: string;

    EventoMicrositios: any[];
    EventoTemas: any[];
    EventoContenidos: any[];
}
