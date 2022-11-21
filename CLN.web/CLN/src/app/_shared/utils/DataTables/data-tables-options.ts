export class DataTablesOptions {

    static settings() {
        return {
            pagingType: 'simple_numbers',
            pageLength: 10,
            processing: true,
            lengthMenu: [10, 20, 50],
            language: {
                emptyTable: 'Sin datos',
                info: 'Mostrando _START_ a _END_ de _TOTAL_',
                infoEmpty: '',
                infoFiltered: '(filtrado de _MAX_ totales)',
                infoPostFix: '',
                decimal: ',',
                thousands: '.',
                lengthMenu: 'N° de registros por pagina _MENU_ ',
                loadingRecords: 'Cargando',
                processing: 'Cargando',
                search: 'Buscar por:',
                searchPlaceholder: '',
                zeroRecords: 'Sin registros',
                paginate: {
                first: 'Primera',
                last: 'Ultima',
                next: 'Siguiente',
                previous: 'Anterior'
                },
                aria: {
                    sortAscending: 'Ascendente',
                    sortDescending: 'descendiente'
                }
            }
        };
    }
}
