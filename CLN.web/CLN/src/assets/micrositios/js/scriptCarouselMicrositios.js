 function iniciarCarruseles() {
  let ArrayTimersCarruseles = [];
  let carruseles = document.querySelectorAll(
    ".carrusel-Escuelas-GrapesJs-container"
  );
  let a = 0;
  let timers;
  // Este arreglo dice por carrusel, que diapositiva se está mostrando, CIM = CarruselItemMostrado
  let CIM = [];
  carruseles.forEach((carrusel) => {
    carrusel.setAttribute("data-carrusel", a);
    ArrayTimersCarruseles.push({ timers });
    a++;
    CIM.push(0); //todos los carruseles inician en la posición 0
  });
  for (let carruselCompleto of [...carruseles]) {
    let numerodeCarrusel = carruselCompleto.getAttribute("data-carrusel");
    let seconds = carruselCompleto.getAttribute("data-time");
    if (seconds == "" || seconds == undefined || parseInt(seconds) < 1) {
      seconds = 3600;
      carruselCompleto.setAttribute("data-time", 3600);
    }
    let carruselCuerpo = carruselCompleto.querySelector(
      ".GrapesJS-Escuelas-carrusel"
    );
    let carruselpaginador1 = document.createElement("div");
    carruselpaginador1.classList.add("carrusel-escuelas-GrapesJS-paginador");
    let carruselpaginador2 = document.createElement("div");
    carruselpaginador2.classList.add("carrusel-escuelas-GrapesJS-paginas");
    carruselpaginador1.appendChild(carruselpaginador2);
    carruselCompleto.appendChild(carruselpaginador1);

    let carruselPaginador = carruselCompleto.children[1].querySelector(
      ".carrusel-escuelas-GrapesJS-paginas"
    );

    IniciarCarrusel(
      ArrayTimersCarruseles,
      carruselCuerpo,
      carruselPaginador,
      seconds,
      CIM,
      numerodeCarrusel
    );
  }
}

function IniciarCarrusel(
  ArrayTimersCarruseles,
  carruselCuerpo,
  carruselPaginador,
  seconds,
  CIM,
  numerodeCarrusel
) {
  let NumeroDiapositivasCarrusel = [...carruselCuerpo.children].length;
  AgregarPaginasCarrusel(
    carruselPaginador,
    carruselCuerpo,
    NumeroDiapositivasCarrusel,
    CIM,
    numerodeCarrusel
  );
  ArrayTimersCarruseles[numerodeCarrusel].timers = setInterval(() => {
    CIM[numerodeCarrusel] =
      (CIM[numerodeCarrusel] + 1) % NumeroDiapositivasCarrusel;
    MoverSliderPaginaSiguiente(carruselCuerpo, CIM[numerodeCarrusel]);
    CambiarEstadoActivoPaginadores(carruselPaginador, CIM[numerodeCarrusel]);
  }, seconds * 1000);
}

function AgregarPaginasCarrusel(
  carruselPaginador,
  carruselCuerpo,
  NumeroDiapositivasCarrusel,
  CIM,
  numerodeCarrusel
) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < NumeroDiapositivasCarrusel; i++) {
    let div = document.createElement("div");
    div.classList.add("carrusel-escuelas-GrapesJS-pagina");
    div.setAttribute("carruselPage", i);

    div.addEventListener("click", (e) => {
      let event = e.target;
      let QueCarruselEs = event.parentElement.parentElement.parentElement.getAttribute(
        "data-carrusel"
      );
      let QuePaginaEs = event.getAttribute("carruselpage");
      CIM[QueCarruselEs] = QuePaginaEs;
      MoverSliderPaginaSiguiente(carruselCuerpo, CIM[numerodeCarrusel]);
      CambiarEstadoActivoPaginadores(carruselPaginador, CIM[numerodeCarrusel]);
    });

    fragment.appendChild(div);
  }
  carruselPaginador.appendChild(fragment);
}
function MoverSliderPaginaSiguiente(carruselCuerpo, n) {
  for (let item of [...carruselCuerpo.children]) {
    item.style.transform = `translate( calc(-100% * ${n}) )`;
  }
}
function CambiarEstadoActivoPaginadores(carruselPaginador, n) {
  for (const circulo of [...carruselPaginador.children]) {
    circulo.getAttribute("carruselPage") == n
      ? circulo.classList.add("carrusel-paginador-activo")
      : circulo.classList.remove("carrusel-paginador-activo");
  }
}
