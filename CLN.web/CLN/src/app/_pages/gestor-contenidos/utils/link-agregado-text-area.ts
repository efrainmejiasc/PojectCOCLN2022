export class LinkAgregadoTextArea {

    id: number;
    url: string;
    enabled: boolean;

    static contador = 0;
    constructor(url: string) {
        this.id = LinkAgregadoTextArea.contador;
        LinkAgregadoTextArea.contador++;
        this.url = url;
        this.enabled = true;
    }
}
