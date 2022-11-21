
export const currencyFormat = ( value: number, currency = 'COP' ) => {

    const formato = new Intl.NumberFormat('de-DE', { 
        style: 'currency', 
        currency
    }).format(value);
    
    return formato;
    
};