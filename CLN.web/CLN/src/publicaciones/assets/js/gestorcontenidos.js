(function($) {
    var gestorcontenidos = {
        apiurltopics: 'api/tema/getTopicsforList',
        apiurlcontents: 'api/contenido/getContentbyMicrositeTopic',
        container: null,
        temas: [],
        idMicrositio: 0,

        buildCarousel: function(temas) {
            if(temas != null && temas.length > 0 ) {
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
                                    <label>${element.descripcion}</label>
                                </div>
                            </div>
                        </li>`
                });
                this.container.append(html);

                // Evento carousell
                new Splide('#carousel-temas', {
                    type   : 'loop',
                    perPage: 5,
                    perMove: 1,
                }).mount();

                // Se consume servicio para construir tabla con el primer elemento
                this.buildTable(temas[0].idTema);
            }
        },

        buildTable: function(idTema) {
            $(`#${idTema}`).addClass('selected');
            let url = `${this.apiurlcontents}/?tema=${idTema}&micrositio=${this.idMicrositio}`;
            $.getJSON(url, function(data, status, xhr) {
                let columns = [
                    { 'data' : 'nombre' }, {
                        data: "fecha",
                        type: "date",
                        render: function (data, type, row) { 
                            let date = data ? moment(data).format('DD/MM/YY hh:mm') : '';
                            return  `<div class="text-center">${date}</div>`;
                        }
                    }, {
                        data: 'descripcion',
                        render: function (data, type, row) {
                            return  `
                                <div class="text-center">
                                    <a href=""><img src="assets/micrositios/images/ojoAzul.svg" ></a>
                                </div>`;
                        }
                    }, {
                        data: 'ruta',
                        render: function (data, type, row) {
                            return  `
                                <div class="text-center">
                                    <a href="${data}" download>
                                        <img src="assets/micrositios/images/${row.tipoContenido}.svg" 
                                             alt="${row.tipoContenido[0].toUpperCase() + row.tipoContenido.substring(1, row.tipoContenido.length).toLowerCase()}">
                                    </a>
                                </div>`;
                        }
                    }
                ];
                $('#tablecontents').builddatatable(columns, data);         
            })
            .fail(function() {
              $('#tablecontents').clean();
            });
        },

        obtainList: function(path) {
            let that = this;
            this.apiurltopics = `${path}/${this.apiurltopics}`;
            $.getJSON(this.apiurltopics, function(result){
                that.buildCarousel(result);
            });
        },

        cleanColors: function() {

        },

        init: function(container, url, idMicrositio) {
            this.container = container;
            this.apiurlcontents = `${url}/${this.apiurlcontents}`;
            this.obtainList(url);
            this.idMicrositio = idMicrositio;
        }
    };

    $.fn.gestorcontenidos = function(url, idMicrositio) {
        let gc = $(this);
        gestorcontenidos.init(gc, url, idMicrositio);
    };

    $.fn.consultContents = function() {
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
    document.querySelector("#buscarTemas").addEventListener("keyup", (e) => {
      let Tema = document.querySelector("#buscarTemas").value;
      let newTematicas = Tematicas.filter((Tematica) => 
        Tematica.descripcion.includes(Tema)
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