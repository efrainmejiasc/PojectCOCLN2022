import { Micrositio } from './micrositio.model';

export interface Template {
    idMicrositioTemplate: number;
    html: string;
    css: string;
    components: any[];
    styles: any[];
    assets: string;
    propia: boolean;
    esPlantilla: boolean;
    idMicrositio: number;
    nombre: string;
    Micrositio: Micrositio;
}
