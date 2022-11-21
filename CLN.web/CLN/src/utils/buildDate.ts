
export const buildDate = ( date = new Date(), invertido = false, conSeparador = true ) => {

    const year = date.getFullYear();
    const currentMonth = date.getMonth();
    const currentDay = date.getDate();

    const month = (currentMonth + 1) < 10 ? `0${currentMonth + 1}` : currentMonth + 1 ;
    const day = currentDay < 10 ? `0${currentDay}` : currentDay;
    
    let fullDate = '';

    if( !invertido ){
        if( conSeparador ){
            fullDate = `${day}-${month}-${year}`;
        }else{
            fullDate = `${day}${month}${year}`;
        }
        
    }else{
        if( conSeparador ){
            fullDate = `${year}-${month}-${day}`;
        }else{
            fullDate = `${year}${month}${day}`;
        }
    }

    return fullDate;
    
};