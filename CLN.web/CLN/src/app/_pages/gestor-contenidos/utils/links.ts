import { LinkAgregadoTextArea } from './link-agregado-text-area';

export class Links {

    asociar = false;
    iniciofin = { start: 0, end:  0 };
    linkCaracteres: number[] = [];
    totalinkcaracteres = 0;
    linksAgregadosTextArea: LinkAgregadoTextArea;
    ArrayLinksAgregadosTextArea: LinkAgregadoTextArea[] = [];

    constructor() { }

    revisartexto(link: LinkAgregadoTextArea) {
        if(document.getElementById(`link${link.id}`)){
            let url: any = document.getElementById(`link${link.id}`);
            let input: any = document.getElementById(`url${link.id}`);
            url.href=input.value;
        }
    }

    agregaurl() {
        let link = new LinkAgregadoTextArea('');
        this.ArrayLinksAgregadosTextArea.push(link);
        let listeners = ['selectionchange', 'mouseup', 'mousedown', 'mouseover', 'keyup', 'click'];
        for (const event of listeners) {
            document.getElementById('cajadetexto').addEventListener(event, this.selection, false);
        }
    }

    borrarurl(link) {
        if (document.getElementById(`link${link.id}`) != null) {
            let element = document.getElementById(`cajadetexto`);
            let withlink = document.getElementById(`link${link.id}`);
            let withoutlink = document.createTextNode(withlink.innerText);
            element.replaceChild(withoutlink, withlink);
            element.innerHTML = element.innerHTML;
        }

        //
        let id = link.id;
        this.linkCaracteres[id] = 0;
        this.totalinkcaracteres = this.linkCaracteres.reduce((a, b) => a + b);
        this.ArrayLinksAgregadosTextArea = this.ArrayLinksAgregadosTextArea.filter(element => element.id !== id);
    }

    asociarurl(link) {
        const interseccion = () => {
            let intersecta = false;

            for (const link of sizetext) {
                // console.log(`[${link['start']},${link['end']}] [${this.iniciofin['start']},${this.iniciofin['end']}]`);
                if (link['start'] >= this.iniciofin['start']) {
                    if (this.iniciofin['end'] >= link['start']) {
                        intersecta = true;
                    }
                } else {
                    if (this.iniciofin['start'] <= link['end']) {
                        intersecta = true;
                    }
                }
            }
            return intersecta;
        };

        const insertarelemento = (ahref, sizehtml, correr, antes, extrasize?) => {
            let total;
            if (antes) {
                let a = ahref.substring(0, sizehtml['start']);
                let ab = correr['etiquetastar']
                let b = ahref.substring(sizehtml['start']);
                total = a + ab + b;

                a = total.substring(0, sizehtml['end'] - correr['etiquetaend'].length);
                ab = correr['etiquetaend'];
                b = total.substring(sizehtml['end'] - correr['etiquetaend'].length);
                total = a + ab + b;
                return total;
            } else {
                let a = ahref.substring(0, sizehtml['start'] + extrasize.length);
                let ab = correr['etiquetastar'];
                let b = ahref.substring(sizehtml['start'] + extrasize.length);
                total = a + ab + b;

                a = total.substring(0, sizehtml['end'] + extrasize.length - correr['etiquetaend'].length);
                ab = correr['etiquetaend'];
                b = total.substring(sizehtml['end'] + extrasize.length - correr['etiquetaend'].length);
                total = a + ab + b;
                return total;
            }
        }
        let inicializarvariables = () => {
            for (const hijo of hijosdirty) {
                let child: any = hijo;
                if (child.outerHTML !== undefined) {
                    hijos.push(hijo);
                    sizehtml.push({
                        start: elemento.innerHTML.indexOf(child.outerHTML),
                        end: elemento.innerHTML.indexOf(child.outerHTML) + child.outerHTML.length
                    });
                    sizetext.push({
                        start: elemento.innerHTML.indexOf(child.outerHTML),
                        end: elemento.innerHTML.indexOf(child.outerHTML) + child.outerHTML.length
                    });
                    correr.push({
                        length: child.outerHTML.length - child.innerHTML.length,
                        etiquetastar: child.outerHTML.substring(child.outerHTML.length - child.innerHTML.length - 4, child.outerHTML - 4),
                        etiquetaend: child.outerHTML.substring(child.outerHTML.length - 4, child.outerHTML.length),
                    });
                }
            }

            for (let i = 0; i < sizetext.length; i++) {
                for (let j = i; j < sizetext.length; j++) {
                    if (j === i) {
                        sizetext[j]['end'] = sizetext[j]['end'] - correr[j]["length"];
                    } else {
                        sizetext[j]['start'] = sizetext[j]['start'] - correr[j]["length"];
                        sizetext[j]['end'] = sizetext[j]['end'] - correr[j]["length"];
                    }
                }
            }
        };

        let elemento = document.getElementById('cajadetexto');
        let URL: any = document.getElementById(`url${link.id}`);
        URL = URL.value;
        let hijosdirty = Array.from(elemento.childNodes);
        let hijos = [];
        let sizehtml = [];
        let sizetext = [];
        let correr = [];
        inicializarvariables();
        let cruza = interseccion();

        if (!cruza && link.enabled) {
            elemento.innerHTML = elemento.innerText;
            let residuo_antes = elemento.innerText.substring(0, this.iniciofin.start);
            let ahref = elemento.innerText.substring(this.iniciofin.start, this.iniciofin.end);
            let residuo_despues = elemento.innerText.substring(this.iniciofin.end, elemento.innerHTML.length);
            ahref = `<a href="${URL}" id="link${link.id}">${ahref}</a>`;
            let extrasize = `<a href="${URL}" id="link${link.id}"></a>`;
            ahref = `${residuo_antes}${ahref}${residuo_despues}`;

            for (let i = 0; i < sizetext.length; i++) {
                if (this.iniciofin.start > sizetext[i]['start']) {
                    ahref = insertarelemento(ahref, sizehtml[i], correr[i], true);
                } else {
                    ahref = insertarelemento(ahref, sizehtml[i], correr[i], false, extrasize);
                }
            }
            elemento.innerHTML = ahref;
        }
    }

    getSelectionCharacterOffsetWithin = (element) => {
        let start = 0;
        let end = 0;
        let doc = element.ownerDocument || element.document;
        let win = doc.defaultView || doc.parentWindow;
        let sel;
        if (typeof win.getSelection !== "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                let range = win.getSelection().getRangeAt(0);
                let preCaretRange = range.cloneRange();                             // creamos una copia del elemento 
                preCaretRange.selectNodeContents(element);                          // seleccionamos todo el texto del elemento
                preCaretRange.setEnd(range.startContainer, range.startOffset);
                start = preCaretRange.toString().length;                            // obtenemos todo el tamaño  inicial del texto
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                end = preCaretRange.toString().length;                              // obtenemos todo el tamaño final del texto
            }
        } else if ((sel === doc.selection) && sel.type !== 'Control') {
            let textRange = sel.createRange();
            let preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint('EndToStart', textRange);
            start = preCaretTextRange.text.length;
            preCaretTextRange.setEndPoint('EndToEnd', textRange);
            end = preCaretTextRange.text.length;
        }
        return { start: start, end: end };
    }

    selection = () => {
        let revisarasociar = () => {
            let elemento = document.getElementById('cajadetexto');
            let arraylinksdom = Array.from(elemento.children);
            for (const linksagregados of this.ArrayLinksAgregadosTextArea) {
                linksagregados['enabled'] = true;
                for (const linksDOM of arraylinksdom) {
                    if (linksDOM.id === `link${linksagregados.id}`) {
                        linksagregados['enabled'] = false;
                    }
                }
            }
        };
        let selOffsets = this.getSelectionCharacterOffsetWithin(document.getElementById('cajadetexto'));
        this.asociar = selOffsets.start !== selOffsets.end;
        this.iniciofin = selOffsets;
        revisarasociar();
    }
}
