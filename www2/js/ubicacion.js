// Geolocalizacion correcta
var onSuccess = function(position) {
    globalUbicacion.lat = position.coords.latitude;
    globalUbicacion.lon = position.coords.longitude;
    listaPromociones();
};

// Error en la geolocalizacion
function onError(error) {
    globalUbicacion.lat = null;
    globalUbicacion.lon = null;
    if(error.code == 2){
        navigator.notification.alert("Cierre el proceso de la aplicación y vuelva a iniciarla para que los cambios GPS " +
                                     "sean detectados.\n\nCODE: " + error.code + "\n\nMESSAGE: " 
                                     + error.message, function(){}, 'F&A', 'Ok');
    }else{
        navigator.notification.alert("Revise que la configuración de localización en su dispositivo este activada.\n\nCODE: " + 
                                 error.code + "\n\nMESSAGE: " + error.message, function(){}, 'F&A', 'Ok');
    }
};

// Error en callback
function errorCallback_lowAccuracy(error) {
    navigator.notification.alert("La funcionalidad de Geolocalización no está funcionando en el dispositivo, " +
                                 "intenta reiniciar tu conexión a internet o el dispositivo.", function(){}, 'F&A', 'Ok');
};

function obtenerPosicion()
{
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
}


/** Se valida si el parametro dado es una latitud **/
function validaLatitud(lat)
{
    if (!isNaN(lat) && lat <= 90 && lat >= -90 && lat != 0) return true;
    else return false;
}

/** Se valida si el parametro dado es una longitud **/
function validaLongitud(lng)
{
    if (!isNaN(lng) && lng <= 180 && lng >= -180 && lng != 0) return true;
    else return false;
}

function abrirMapa(lat, lon, establecimiento)
{
    try
    {
        if(validaLatitud(lat) && validaLongitud(lon))
        {
            var coords = lat + ',' + lon;
            if(dispositivo === 'Android')
            {
                window.open("http://maps.google.com/maps?q=" + coords + "(Establecimiento)&iwloc=A&hl=es", '_system');
            }
            else
            {
                window.open("http://maps.apple.com/?q=" + coords, '_system');
            }
        }
        else
        {
            navigator.notification.alert("El establecimiento no cuenta con coordenadas de ubicación", function(){}, 'F&A', 'Ok');
        }
    }
    catch(error)
    {
        navigator.notification.alert("La funcionalidad de Geolocalización no está funcionando en el dispositivo, " +
                                 "intenta reiniciar tu conexión a internet o el dispositivo.", function(){}, 'F&A', 'Ok');
    }
}

function buscaEstablecimientosCercano()
{
    refrescarListaPromociones(categoriaSeleccionada, 1);
}