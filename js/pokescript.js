//variables
let caja = document.querySelector("div.caja");
let image = document.querySelector("div.imagen");
let urlAnterior;
let urlSiguiente = "https://pokeapi.co/api/v2/pokemon";
let contador = 0; //equivalente al valor offset

let botonSiguiente = document.querySelector("#btnSiguiente");
let botonAnterior = document.querySelector("#btnAnterior");

//funciones por expresion
let cargarDatos = function (url) {
    fetch(url)
    .then(respuesta => respuesta.json()) //el metodo .then() maneja el resultado de una promesa. Se ejecuta cuando la promesa se resuelva con éxito y reciba el resultado.
    .then(valor => mostrarResultado(valor))
};

let mostrarResultado = function (datos) {
    caja.innerHTML = "";

    for (pokemon of datos.results) {

        caja.insertAdjacentHTML("beforeend",
            `<a href="#" onclick="anadirImagen('${pokemon.url}')">
            ${pokemon.name}</a><br>
        `);
    }
    caja.insertAdjacentHTML("beforeend",`Total Pokemons: ${datos.count}`)
    urlSiguiente = datos.next;
    urlAnterior = datos.previous;
    image.innerHTML = "";
};


let irSiguiente = function () {
    cargarDatos(urlSiguiente);
};


let irAnterior = function () {
    cargarDatos(urlAnterior);
};

let anadirImagen = function (urlImagen) {
    //console.log(url);
    fetch(urlImagen)
    .then(respuesta => respuesta.json())
    .then(valor => {
            let etiquetaImagen = `<img src="${valor.sprites.front_default}">`;
            image.innerHTML = "";
            image.insertAdjacentHTML("beforeend", etiquetaImagen);
        }
    );
};


//eventos
botonSiguiente.addEventListener("click", irSiguiente);
botonAnterior.addEventListener("click", irAnterior);

//propiedades
irSiguiente(); 

