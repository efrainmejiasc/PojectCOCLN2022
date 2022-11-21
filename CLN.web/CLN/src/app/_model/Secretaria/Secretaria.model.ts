import { Integrante } from './integrante.model';

export class Secretaria {
    idSecretaria: number;
    entidadTerritorial: string;
    departamento: number;
    depNombre: string;
    municipio?: number;
    munNombre: string;
    secretario: string;
    direccion: string;
    telefonoContacto: string;
    correoInstitucional: string;
    url: string;
    idEstado: number;
    estado: string;
    equipo: Integrante[];
}

export class SecretariaRender extends Secretaria {
    titulo: string;
    estado: string;
}

export class CambioEstado {
    id: number;
    isActived: boolean;
}