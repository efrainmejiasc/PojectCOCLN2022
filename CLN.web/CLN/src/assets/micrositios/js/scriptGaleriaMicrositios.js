 function InicializarGalerias() {
  // Seleccionamos todas las galerías que hay
  let url =  getURlGaleria();
  let galerias = document.querySelectorAll(".Galeria-Escuelas-container");
  // ahora cogemos cada galeria, se compone de muchas imagenes, cada una es un componente
  galerias.forEach((galeria) => {
    // Agregamos el nombre a cada imagen
    addNames(galeria);

    // Los comentarios están habilitados ?
    allowComments(galeria, url);

    // Agregamos las paginas
    AgregarPaginasGaleria(galeria);
  });
}
function allowComments(galeria, url) {
  let componentes = [...galeria.children];
  let allowCommetsPerGallery = galeria.getAttribute("allow_comments") == "YES";
  if (allowCommetsPerGallery) {
    componentes.forEach((componente) => {
      addCommentsByPhoto(componente, url);
    });
  }
}
function addCommentsByPhoto(componente, url) {
  let fragment = document.createDocumentFragment();
  let buttonoptions = Crearbotones();
  let comentarios = CrearComentarios();
  let input = CrearCampoInput(url);
  fragment.appendChild(buttonoptions);
  fragment.appendChild(comentarios);
  fragment.appendChild(input);
  componente.children[1].children[0].appendChild(fragment);
  listenerlikes(componente, url);
  getlikes(componente, url);
  listenerComments(componente);
  getComments(componente, url);

  // aquí colocamos el número de comentarios
  // [...buttons.children][1].children[1].textContent =
  //   comentarios.children.length;
}
function addNames(galeria) {
  let componentes = [...galeria.children];
  componentes.forEach((componente) => {
    createoptions(componente);
  });
}
function createoptions(componente) {
  let nombre = componente.getAttribute("data-name");

  let div1 = document.createElement("div");
  div1.classList.add("galeria-componente-opciones");
  let div1_1 = document.createElement("div");
  div1_1.classList.add("galeria-componente-opciones-contenido");
  let div1_1_1 = document.createElement("div");
  div1_1_1.classList.add("galeria-componente-opciones-descripcion");
  div1_1_1.textContent = nombre;
  div1_1.appendChild(div1_1_1);
  div1.appendChild(div1_1);
  componente.appendChild(div1);
}

function listenerComments(componente) {
  // Creamos el listener para Mostrar y ocultar comentarios
  let buttons = componente.children[1].children[0].children[1].children[1];
  let comentarios = componente.children[1].children[0].children[2];
  buttons.addEventListener("click", () => {
    buttons.children[0].classList.toggle("selected-to-show-comments");
    comentarios.classList.toggle("show");
  });

  // listener para crear comentario
}
function getComments(componente, url) {
  let rutafoto = componente.children[0].children[0].src;
  let id = rutafoto.slice(
    rutafoto.lastIndexOf("/") + 1,
    rutafoto.lastIndexOf(".")
  );
  fetch(`${url}/api/multimedia/getMultimediaComments/?multimedia=${id}`)
    .then((rta) => (rta.ok ? Promise.resolve(rta) : Promise.reject(rta)))
    .then((res) => res.json())
    .then((res) => drawcomments(res, componente));
}
function drawcomments(res, componente) {
  let fragment = document.createDocumentFragment();
  componente.children[1].children[0].children[1].children[1].children[1].textContent =
    res.length;
  let comentarios = [...res];
  comentarios.forEach((C) => {
    let div = document.createElement("div");
    div.classList.add("comentario");
    div.textContent = C.comentario;
    fragment.appendChild(div);
  });
  if (comentarios.length > 0) {
    componente.children[1].children[0].children[2].textContent = "";
    componente.children[1].children[0].children[2].appendChild(fragment);
  }
}

function listenerlikes(componente, url) {
  componente.children[1].children[0].children[1].children[0].addEventListener(
    "click",
    (e) => {
      let foto =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.children[0].children[0];
      let estadoactual = foto.getAttribute("estado-actual");

      let accion = "add";
      if (estadoactual == "like" || estadoactual == null) {
        e.target.parentElement.children[0].classList.add("like");
        foto.setAttribute("estado-actual", "unlike");
      } else {
        accion = "remove";
        e.target.parentElement.children[0].classList.remove("like");
        foto.setAttribute("estado-actual", "like");
      }

      let rutafoto = foto.src;
      let id = rutafoto.slice(
        rutafoto.lastIndexOf("/") + 1,
        rutafoto.lastIndexOf(".")
      );
      fetch(
        `${url}/api/multimedia/setMultimediaLike/?multimedia=${id}&accion=${accion}`,
        {
          method: "PUT",
        }
      )
        .then((rta) => (rta.ok ? Promise.resolve(rta) : Promise.reject(rta)))
        .then((res) => res.json())
        .then((res) => getlikes(componente, url));
    }
  );
}
function getlikes(componente, url) {
  let rutafoto = componente.children[0].children[0].src;
  let id = rutafoto.slice(
    rutafoto.lastIndexOf("/") + 1,
    rutafoto.lastIndexOf(".")
  );
  fetch(`${url}/api/multimedia/getMultimediaLikes?multimedia=${id}`)
    .then((rta) => (rta.ok ? Promise.resolve(rta) : Promise.reject(rta)))
    .then((res) => res.json())
    .then((res) => drawlikes(res, componente));
}
function drawlikes(res, componente) {
  componente.children[1].children[0].children[1].children[0].children[1].textContent =
    res[0].likes;
}

function AgregarPaginasGaleria(galeria) {
  let cant_imgs = parseInt(galeria.getAttribute("cant_imgs"));
  if (isNaN(cant_imgs) || cant_imgs <= 0) {
    galeria.setAttribute("cant_imgs", 5);
    cant_imgs = 5;
  }
  let fragment = document.createDocumentFragment();
  let NumeroDeFotos = galeria.children.length;
  let NumeroDePaginas = Math.ceil(NumeroDeFotos / cant_imgs);
  for (let j = 0; j < NumeroDePaginas; j++) {
    let div = crearpagina();
    for (let i = 0; i < cant_imgs; i++) {
      if (galeria.childElementCount > 0) {
        div.appendChild(galeria.removeChild(galeria.children[0]));
      }
    }
    fragment.appendChild(div);
  }
  let arrowleft = crearArrow("left");
  let arrowrigth = crearArrow("right");
  fragment.appendChild(arrowleft);
  fragment.appendChild(arrowrigth);
  galeria.appendChild(fragment);
}
function crearArrow(direction) {
  let div1 = document.createElement("div");
  div1.classList.add("galeria-arrow");
  div1.classList.add(direction);
  div1.addEventListener("click", (e) => {
    let hojas = [...e.target.parentElement.querySelectorAll(".galeria-pagina")];
    let direction = e.target.classList.contains("right") ? -1 : 1;
    let Npaginas = hojas.length;
    hojas.forEach((hoja) => {
      let valor = parseInt(
        hoja.style.transform.substring(
          hoja.style.transform.indexOf("(") + 1,
          hoja.style.transform.indexOf("%")
        )
      );
      valor = (valor + direction * 100 - Npaginas * 100) % (Npaginas * 100);
      hoja.style = `transform: translate(${valor}%);`;
    });
  });

  return div1;
}
function crearpagina() {
  let div1 = document.createElement("div");
  div1.classList.add("galeria-pagina");
  div1.style = "transform: translate(0%);";
  return div1;
}
function Crearbotones() {
  let div1 = document.createElement("div");
  div1.classList.add("galeria-componente-opciones-contenido-buttons");

  let div1_1 = document.createElement("div");
  div1_1.classList.add("button");
  let div1_1_1 = document.createElement("div");
  div1_1_1.classList.add("img");
  div1_1_1.classList.add("img-corazon");

  let div1_1_2 = document.createElement("div");
  div1_1_2.classList.add("button-num");
  div1_1.appendChild(div1_1_1);
  div1_1.appendChild(div1_1_2);

  let div1_2 = document.createElement("div");
  div1_2.classList.add("button");
  let div1_2_1 = document.createElement("div");
  div1_2_1.classList.add("img");
  div1_2_1.classList.add("img-comentario");

  let div1_2_2 = document.createElement("div");
  div1_2_2.classList.add("button-num");

  div1_2.appendChild(div1_2_1);
  div1_2.appendChild(div1_2_2);
  div1.appendChild(div1_1);
  div1.appendChild(div1_2);
  return div1;
}
function CrearComentarios() {
  let div1 = document.createElement("div");
  div1.classList.add("galeria-componente-opciones-contenido-comentarios");

  return div1;
}
function CrearCampoInput(url) {
  let div1 = document.createElement("div");
  div1.classList.add("galeria-componente-opciones-contenido-input");

  let div1_1 = document.createElement("div");
  div1_1.classList.add("button");

  let div1_1_1 = document.createElement("div");
  div1_1_1.classList.add("img");
  div1_1_1.classList.add("img-comentario");

  let input1_1 = document.createElement("input");
  input1_1.type = "text";

  let div2_1 = document.createElement("div");
  div2_1.classList.add("button");

  let div2_1_1 = document.createElement("div");
  div2_1_1.classList.add("img");
  div2_1_1.classList.add("img-btn-Enviar-Comentario");

  div2_1_1.addEventListener("click", (e) => {
    let comentario = e.target.parentElement.parentElement.children[1].value;
    e.target.parentElement.parentElement.children[1].value = "";
    let fotoSrc =
    e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.children[0].children[0].src;
    let idfoto = fotoSrc.slice(
      fotoSrc.lastIndexOf("/") + 1,
      fotoSrc.lastIndexOf(".")
    );
    let componente =
    e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    if (comentario.length > 0) {
      fetch(
        `${url}/api/multimedia/setMultimediaComment/?multimedia=${idfoto}&comentario=${comentario}`,
        {
          method: "PUT",
        }
      )
        .then((rta) => (rta.ok ? Promise.resolve(rta) : Promise.reject(rta)))
        .then((res) => res.json())
        .then((res) => getComments(componente, url));
    }
  });

  div2_1.appendChild(div2_1_1);
  div1_1.appendChild(div1_1_1);

  div1.appendChild(div1_1);
  div1.appendChild(input1_1);
  div1.appendChild(div2_1);

  return div1;
}

function getURlGaleria(){
  let url = window.parent.location.origin;
  if(
    url.includes('escuelassecretariaspre.ivolucion') ||
    url.includes('escuelasecretarias.mineducacion') 
  ){
    url = url + '/backend';
  }
  if(url.includes('localhost') || url.includes('escuelasecretarias.ivolucion') ){
    url = 'https://pruebaescuelasecretarias.ivolucion.com';
  }

  return url;
}