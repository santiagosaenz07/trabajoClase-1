/*
  QUIZ 1 - PROGRAMACIÓN WEB
  Respetado estudiante teniendo en cuenta el proyecto proporcionado deberá desarrollar las siguientes funcionalidades en el sitio web:

  1) Solicitar datos del clima a la API de https://api.open-meteo.com/ usando las coordenadas seleccionadas por el usuario en el mapa. 
  2) Cuando llega la respuesta del servidor, si es correcta mostrar los datos en la tabla correspondiente. 
  3) Desarrollar un historial de busquedas anteriores que vaya cargando en la medida que el usuario selecciona diferentes ubicaciones en el mapa.
*/

let mapa;

window.addEventListener("load", function () {
    mapa = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
        ],
        view: new ol.View({
            center: ol.proj.transform([-72.265911, 3.7644111], 'EPSG:4326', 'EPSG:3857'),
            zoom: 5,
        }),
    });

    mapa.on('click', function (evt) {
        let coordinates = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        let latitud = coordinates[1].toFixed(6);
        let longitud = coordinates[0].toFixed(6);
        console.log("Latitud:", latitud);
        console.log("Longitud:", longitud);
        obtenerClima(latitud, longitud);
    });
});

function obtenerClima(lat, lon) {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.current_weather) {
                let temp = data.current_weather.temperature;
                let humedad = data.hourly?.relative_humidity_2m ? data.hourly.relative_humidity_2m[0] : 'N/A';
                actualizarTabla(lat, lon, temp, humedad);
                actualizarHistorial(lat, lon, temp, humedad);
            } else {
                alert("No se pudo obtener el clima para esta ubicación.");
            }
        })
        .catch(error => console.error("Error obteniendo el clima:", error));
}

function actualizarTabla(lat, lon, temp, humedad) {
    let filas = document.querySelectorAll("#tabla_datos tbody tr td:last-child");
    filas[0].textContent = lat;
    filas[1].textContent = lon;
    filas[2].textContent = temp + " °C";
    filas[3].textContent = humedad + " %";
}

function actualizarHistorial(lat, lon, temp, humedad) {
    let tablaHistorial = document.querySelector("#tabla_historial");
    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${lat}</td><td>${lon}</td><td>${temp} °C</td><td>${humedad} %</td>`;
    tablaHistorial.appendChild(fila);
}
