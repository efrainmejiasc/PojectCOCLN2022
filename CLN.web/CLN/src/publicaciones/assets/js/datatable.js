function init() {
    // Setting datatable defaults
    $.extend($.fn.dataTable.defaults, {
        autoWidth: false,
        scrollCollapse: true,
        //searching: false,
        ordering: false,
        dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
        language: {
            processing: "Procesando...",
            search: '<span>Resultados:</span> _INPUT_',
            searchPlaceholder: 'Búsqueda',
            lengthMenu: '<span>Cantidad de registros:</span> _MENU_',
            info: "_TOTAL_ RESULTADOS",
            infoEmpty: "0 RESULTADOS",
            infoPostFix: "",
            loadingRecords: "Cargando registros...",
            zeroRecords: "No se han encontrado registros",
            emptyTable: "No se han encontrado registros",
            paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' },
            infoFiltered: "(Filtrados de _MAX_ registros.)",
        },
        drawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
        },
        preDrawCallback: function() {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        }
    });
}

function construcciondata (idTable, columns, data) {
    var table = $('#' + idTable);

    if ($.fn.DataTable.isDataTable(table)) {
        var datatable = $('#' + idTable).DataTable();
        datatable.destroy();
    }

    // Setting datatable defaults
    $(table).DataTable({
        data: data,
        columns: columns,
        responsive: true,
        autoWidth: false
    });
}

function clean (idTable) {
    var table = $('#' + idTable);

    if ($.fn.DataTable.isDataTable(table)) {
        var datatable = $('#' + idTable).DataTable();
        datatable.destroy();
    }

}