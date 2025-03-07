/*
Consumir el endPoint de la API de pokemon disponible en: 
https://pokeapi.co/

Características para desarrollar: 
 - Cuando el sitio cargue se debe seleccionar aleatoriamente un pokemon de 1 a 1025 y enviar una solicitud con el número generado.
 - Cuando ser recibe la respuesta del servidor se debe cargar los datos del pokemon en la página.
 - Cuando el usuario ingrese el nombre o el id de un pokemon y de click en buscar se debe enviar una petición a la API.
 - Cuando el servidor responda la solicitud se deben cargar los datos del pokemon en la página. 
 - En caso de no encontrar el pokemon ingresado por el usuario en el servidor generar un alert con el mensaje "pokemon no encontrado"
*/


//URL BASE PARA PETICIONES HTTP
let base_url = "https://pokeapi.co/api/v2/pokemon/";


//Funcion para cargar información de un pokemon en el DOM de nuestra página.
function cargarPokemon(pokemon){
    /*Escriba la lógica de la funcion */
    document.getElementById("pokemon_name").innerText= pokemon.name.toUpperCase();
    document.getElementById("pokemon_id").innerText= pokemon.id;
    document.getElementById("pokemon_height").innerText= pokemon.height;
    document.getElementById("pokemon_weight").innerText= pokemon.weight;
    document.getElementById("pokemon_image").src= pokemon.sprites.front_default;
}

//Funcion para enviar peticiones a la API por el parámetro dado. 
function obtenerDatosPokemon(parameter){
    /*Escriba la lógica de la funcion */
   
    let url= base_url+parameter;

    fetch(url)
        .then((response)=>{
            if(!response.ok){
                throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then ((data)=>{
            cargarPokemon(data);
        })
        .catch((error)=>{
            console.error("Error: ", error);
        })
    
}

//Funcion para obtener el dato ingresado por el usuario.
function buscarPokemon(){
    /*Escriba la lógica de la funcion */
    let parametro= document.getElementById("pokemon_text").value;
    obtenerDatosPokemon(parametro);
}


//Añadir listeners al botón
document.getElementById("buscar").addEventListener('click',buscarPokemon);

//Generar id de pokemon aleatorio
const randomPokemon = parseInt(Math.random()*1024)+1;



obtenerDatosPokemon(randomPokemon);