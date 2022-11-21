
export const buildHour = ( hora: string ) => {

    const arrayHora = hora.split(':');
    let nuevaHora = '';
    let nuevoMinuto = '';

    if( parseInt( arrayHora[0] ) < 10 ){
        nuevaHora = `0${ arrayHora[0] }`;
    }

    if( parseInt( arrayHora[1] ) < 10 ){
        nuevoMinuto = `0${ arrayHora[1] }`;
    }

    return `${ nuevaHora }:${ nuevoMinuto }`;
    
};