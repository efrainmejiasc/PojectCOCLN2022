export const replaceTexto = ( texto: string, invertido = false ) => {

    let text = texto;

    if( invertido ) {

        text = text.replace('text-align: center;', 'ql-align-center');
        text = text.replace('style', 'class');
        text = text.replace('text-align: right;', 'ql-align-right');
        text = text.replace('style', 'class');
        text = text.replace('text-align: justify;', 'ql-align-justify');
        text = text.replace('style', 'class');
        text = text.replace('font-size: 0.75em;', 'ql-size-small');
        text = text.replace('style', 'class');
        text = text.replace('font-size: 1.5em;', 'ql-size-large');
        text = text.replace('style', 'class');

    }else{
        text = text.replace('ql-align-center', 'text-align: center;');
        text = text.replace('class', 'style');
        text = text.replace('ql-align-right', 'text-align: right;');
        text = text.replace('class', 'style');
        text = text.replace('ql-align-justify', 'text-align: justify;');
        text = text.replace('class', 'style');
        text = text.replace('ql-size-small', 'font-size: 0.75em;');
        text = text.replace('class', 'style');
        text = text.replace('ql-size-large', 'font-size: 1.5em;');
        text = text.replace('class', 'style');
    }

    return text;
    
};