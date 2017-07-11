var dispositivo = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

document.addEventListener("deviceready", function() {
    if(dispositivo != "Android") $(".exitapp").hide();
}, false);

var categoriaSeleccionada = 1;

var promoSeleccionada = null;

var sucursalSeleccionada = null;

var sucursalSelect = null;

var estadoSeleccionado = null;

var estadoSeoPermalink = null;

var globalFiltros = 'notfilterset';

var globalToken = '';

var globalUbicacion = { lat: null, lon: null };

var categorias_arr = ['fa-shopping-cart', 'fa-cutlery', 'fa-users', 'fa-hospital-o', 'fa-smile-o'];

$.fn.once = function(a, b) {
    return this.each(function() {
        $(this).off(a).on(a,b);
    });
};

function reinicia()
{
    categoriaSeleccionada = 1;
    promoSeleccionada = null;
    sucursalSeleccionada = null;
    estadoSeleccionado = null;
    estadoSeoPermalink = null;
    globalFiltros = '';
    globalUbicacion.lat = null;
    globalUbicacion.lon = null;
}