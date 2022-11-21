(function ($) {
    var gestorcontenidos = {
        apiurltopisv2: 'api/tema/getTopicsbyMicrositeContentforList/?idMicrosite=',
        apiurltopics: 'api/tema/getTopicsforList',
        apiurlcontents: 'api/contenido/getContentbyMicrositeTopic',
        apiurlDownload: 'api/contenido/downloadContent',
        url: '',
        container: null,
        temas: [],
        idMicrositio: 0,

        buildCarousel: function (temas) {
            if (temas != null && temas.length > 0) {
                this.temas = temas;
                let html = '';
                temas.forEach(element => {
                    html += `
                        <li class="splide__slide" id="${element.idTema}">
                            <div class="grid-content" data-id="${element.idTema}" onclick="$(this).consultContents()">
                                <div class="logo py-1 px-0 px-md-3">
                                    <img class="grid-img-logo" src="assets/micrositios/images/carpeta blanca.svg" alt="Tema">
                                </div>
                                <div class="contenido">
                                    <label style="color:#fff;">${element.descripcion}</label>
                                </div>
                            </div>
                        </li>`
                });
                this.container.append(html);

                // Evento carousell
                new Splide('#carousel-temas', {
                    type: 'slide',
                    perPage: 5,
                    perMove: 1,
                }).mount();

                // Se consume servicio para construir tabla con el primer elemento
                this.buildTable(temas[0].idTema);
            }
        },

        buildTable: function (idTema) {
            document.querySelectorAll(`div[data-id]`).forEach(e => {
                e.classList.remove('selected');
            })
            $(`div[data-id='${idTema}']`).addClass('selected');
            let url = `${this.apiurlcontents}/?tema=${idTema}&micrositio=${this.idMicrositio}`;
            let descargarContenidos = `${this.url}/${this.apiurlDownload}`
            $.getJSON(url, function (data, status, xhr) {
                let columns = [{
                    data: "nombre",
                    render: function (data, type, row) {
                        let ext = row.ruta.substring(row.ruta.lastIndexOf(".") + 1);
                        if (row.tipoContenido == "ENLACE") ext = "enlace web";
                        console.group("DATA MICROSITIOS")
                        console.log(row)
                        console.log(ext);
                        console.groupEnd();
                        return `<div class="grid-layout-table">
                                    <img class="grid-content-table" src="assets/micrositios/images/ext/${ext}.svg" alt=""/>
                                    <div class="grid-content-table">${data}</div>
                                </div>`;
                    }
                }, {
                    data: "fecha",
                    type: "date",
                    render: function (data, type, row) {
                        let date = data ? moment(data).format('DD/MM/YY ') : '';
                        return `<div class="text-center;">${date}</div>`;
                    }
                }, {
                    data: 'descripcion',
                    render: function (data, type, row) {
                        return `
                                <div class="text-center" data-toggle="modal" data-target="#Gestor-ContenidosDescripcion_${row.idContenido}">
                                    <div><img src="assets/micrositios/images/ojoAzul.svg" >

                                  
                                    <div class="modal fade" id="Gestor-ContenidosDescripcion_${row.idContenido}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <h5 class="modal-title" id="exampleModalLabel">Descripción del contenido</h5>
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div class="modal-body gestor-contenidos-modal-body-descripcion">
                                          ${data}
                                        </div>
                                        <div class="modal-footer d-flex justify-content-center">
                                          <button type="button" class="modal-close-gestor-contenidos" data-dismiss="modal">Cerrar</button>
                                    
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                   
                                    </div>
                                </div>`;
                    }
                }, {
                    data: 'ruta',
                    render: function (data, type, row) {

                        let now = (row.tipoContenido == "ARCHIVO") ? `<a  href='${descargarContenidos}?ruta=${data}'  >` : `<a  href='${data}' target="_blank" >`;
                        let after = `<img src="assets/micrositios/images/${row.tipoContenido}.svg" 
                            alt="${row.tipoContenido[0].toUpperCase() + row.tipoContenido.substring(1, row.tipoContenido.length).toLowerCase()}">
                                    </a>
               </div>`;

                        return `<div class="text-center">` + now + after;
                    }
                }
                ];

                $('#tablecontents').builddatatable(columns, data);
            })
                .fail(function () {
                    $('#tablecontents').clean();
                });
        },
        obtainList: function (path, idMicrositio) {
            let that = this;
            // this.apiurltopics = `${path}/${this.apiurltopics}`;
            this.apiurltopics = `${path}/${this.apiurltopisv2}${idMicrositio}`;
            $.getJSON(this.apiurltopics, function (result) {
                that.buildCarousel(result);
            });
        },

        cleanColors: function () {

        },

        init: function (container, url, idMicrositio) {
            this.container = container;
            this.apiurlcontents = `${url}/${this.apiurlcontents}`;
            this.obtainList(url, idMicrositio);
            this.idMicrositio = idMicrositio;
            this.url = url;
        }
    };

    $.fn.gestorcontenidos = function (url, idMicrositio) {
        let gc = $(this);
        gestorcontenidos.init(gc, url, idMicrositio);
    };

    $.fn.consultContents = function () {
        let idTema = $(this).attr('data-id');
        gestorcontenidos.buildTable(idTema);
    }
}(jQuery));

function filtro() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('buscarTemas');
    filter = input.value.toUpperCase();
    ul = document.getElementById('listatemas');
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('label')[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

function listenerBuscar(Tematicas) {
    document.querySelector("#buscarTemas").addEventListener("change", (e) => {
        let Tema = document.querySelector("#buscarTemas").value.toLowerCase();
        let newTematicas = Tematicas.filter((Tematica) =>
            Tematica.descripcion.toLowerCase().includes(Tema)
        );
        removelistenersTemas();
        for (const child of [...carrousel.children]) {
            carrousel.removeChild(child);
        }
        let fragment = createcarrouselpage(newTematicas);
        carrousel.appendChild(fragment);
        listenersTemas();
    });
}

