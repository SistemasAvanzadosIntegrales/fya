$(document).on('pageshow', '#descripcionpromocion', function(){
    $("#loading").show();
    obtenerPosicionParaDetalle();
    /*try
    {
        console.log("Promo seleccionada: "+promoSelect);
        var rutaWebService = 'http://webservices.promo-zone.com.mx/obtenerestablecimiento.php?callback=?';
        $.getJSON( rutaWebService, { token: globalToken, promo: promoSelect, sucursal: sucursalSelect })
        .done(function(answer) {
            $("#loading").hide();
            if(answer.error === undefined)
            {
                if(answer.promocion !== undefined)
                {
                    try
                    {
                        var promocion = answer.promocion[0];
                        $("#descLogo").html('<img src="http://old-site.promo-zone.com.mx/' + promocion.logo + '" wi dth="300px" style="vertical-align: middle;max-width:300px"/>');
                        
                        var imagenes = promocion.imagen.split("||");
                        $("#galeria_promocion").html('');
                        for(var i = 0; i < imagenes.length; i++)
                        {
                            $("#galeria_promocion").html($("#galeria_promocion").html() + '<li><img src="http://old-site.promo-zone.com.mx/' + imagenes[i] + '" width="100%" style="vertical-align: middle;"/></li>');
                        }
                        
                        $("#descProm").html(promocion.promocion);
                        $("#descEstab").html(promocion.descripcion);
                        $("#descMap").once('click', function(){
                            abrirMapa(promocion.lat, promocion.lon);
                        });
                        
                        // COMENTADO POR FERNANDO VILLARRUEL
                        //if(parseInt(promocion.destacado) == 1)
                        //{
                        //    $("#dpahead").removeClass("fa-star-o").addClass("fa-check-circle");
                        //    $("#dpahead").attr("onClick", "quitarFavorito()");
                        //    $("#lblahead").html("Quitar de favoritos");
                        //}
                        //else
                        //{
                        //    $("#dpahead").removeClass("fa-check-circle").addClass("fa-star-o");
                        //    $("#dpahead").attr("onClick", "anadirFavorito()");
                        //    $("#lblahead").html("Añadir a favoritos");
                        //}
                        
                        $('#galeriaimg').slideme({
                            arrows: false,
                            pagination: false,
                            nativeTouchScroll: true,
                            loop: true,
                            autoslide : true,
                            interval : 2000,
                            resizable: {
                            }
                        });
                    }
                    catch(err)
                    {
                        $("#loading").hide();
                        navigator.notification.alert("Ha ocurrido un error: " + err.message, function(){}, 'PromoZone', 'Ok');
                    }
                }
                else if(answer.size !== undefined)
                {
                    $("#loading").hide();
                    navigator.notification.alert("No hay promociones disponibles", function(){}, 'PromoZone', 'Ok');
                }
                else
                {
                    $("#loading").hide();
                    navigator.notification.alert(answer.message, function(){}, 'PromoZone', 'Ok');
                }
            }
            else
            {
                $("#loading").hide();
                navigator.notification.alert(answer.error, function(){}, 'PromoZone', 'Ok');
            }    
        });
    }
    catch(err)
    {
        navigator.notification.alert("Ha ocurrido un error: " + err.message, function(){}, 'PromoZone', 'Ok');
    }*/
});
function obtenerPosicionParaDetalle()
{
    navigator.geolocation.getCurrentPosition(posicionCorrecta, posicionIncorrecta, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
}
var posicionCorrecta = function(position){
    globalUbicacion.lat = position.coords.latitude;
    globalUbicacion.lon = position.coords.longitude;
    obtenerDetalleEstablecimiento(globalUbicacion.lat, globalUbicacion.lon);
}
var posicionIncorrecta = function(error){
    globalUbicacion.lat = null;
    globalUbicacion.lon = null;
    obtenerDetalleEstablecimiento(globalUbicacion.lat, globalUbicacion.lon);
}

function obtenerDetalleEstablecimiento(latitud,longitud){
    try{
        if( (latitud!=null && latitud!=undefined) && (longitud!=null && longitud!=undefined) ){
            var rutaWebService = "http://api.promo-zone.com.mx/v1/establecimientos/"+sucursalSelect+'/'+latitud+'/'+longitud;
        }else{
            var rutaWebService = "http://api.promo-zone.com.mx/v1/establecimientos/"+sucursalSelect;
        }
        console.log("Consumiendo el siguiente servicio: "+rutaWebService);
        $.getJSON(rutaWebService).done(function(answer){
            console.log(answer);
            if(answer!=undefined){
                try{
                    var promocion = answer.promocion;
                    $("#descLogo").html('<img src="'+answer.img_logotipo+'" wi dth="300px" style="vertical-align: middle;max-width:300px"/>');
                    
                    $("#galeria_promocion").html('<img src="'+answer.imagen_principal+'" width="100%" style="vertical-align: middle;"/>');
                    $("#descProm").html(promocion.promocion+'<br/><br/>'+promocion.restricciones);
                    $("#descEstab").html(answer.contenido).css("text-align","justify");
                    
                    if(answer.sucursal!=undefined){
                        console.log("Se encontro el nodo de la sucursal");
                        if(answer.sucursal.latitud!=0 && answer.longitud!=0){
                            console.log("Coordenadas listas para google maps!.");
                            $("#descMap").show();
                            $("#descMap").once('click', function(){
                                abrirMapa(answer.sucursal.latitud,answer.sucursal.longitud);
                            });
                        }else{
                            $("#descMap").hide();
                            console.log("Las coordenadas son incorrectas para este detalle.");
                        }
                    }else{
                        $("#descMap").hide();
                        console.log("No hay un nodo de coordenadas en la respuesta del servicio!.");
                    }
                    $("#loading").hide();

                }catch(err){
                    
                }
            }else if(answer.length<=0 || answer == undefined || answer== ''){
                navigator.notification.alert("No hay promociones disponibles", function(){}, 'PromoZone', 'Ok');
                $("#loading").hide();
            }
        });
    }catch(err){
        navigator.notification.alert("No ocurrido un error: "+ err.message, function(){}, 'PromoZone', 'Ok');
        $("#loading").hide();
    }
}

/* COMENTADO POR FERNANDO VILLARRUEL
function anadirFavorito()
{
    var rutaWebService = 'http://promo-zone.com.mx/webservices/anadirfavorito.php?callback=?';
    $.getJSON( rutaWebService, { token: globalToken, promo: promoSelect, sucursal: sucursalSelect })
    .done(function(answer) {
        $("#loading").hide();
        if(answer.error === undefined)
        {
            if(answer.anadido !== undefined)
            {
                $("#dpahead").removeClass("fa-star-o").addClass("fa-check-circle");
                $("#dpahead").attr("onClick", "quitarFavorito()");
                $("#lblahead").html("Quitar de favoritos");
                navigator.notification.alert(answer.anadido, function(){}, 'PromoZone', 'Ok');
            }
            else
            {
                navigator.notification.alert(answer.message, function(){}, 'PromoZone', 'Ok');
            }
        }
        else
        {
            navigator.notification.alert(answer.error, function(){}, 'PromoZone', 'Ok');
        }    
    });
}

function quitarFavorito()
{
    var rutaWebService = 'http://promo-zone.com.mx/webservices/quitarfavorito.php?callback=?';
    $.getJSON( rutaWebService, { token: globalToken, promo: promoSelect, sucursal: sucursalSelect })
    .done(function(answer) {
        $("#loading").hide();
        if(answer.error === undefined)
        {
            if(answer.eliminado !== undefined)
            {
                $("#dpahead").removeClass("fa-check-circle").addClass("fa-star-o");
                $("#dpahead").attr("onClick", "anadirFavorito()");
                $("#lblahead").html("Añadir a favoritos");
                navigator.notification.alert(answer.eliminado, function(){}, 'PromoZone', 'Ok');
            }
            else
            {
                navigator.notification.alert(answer.message, function(){}, 'PromoZone', 'Ok');
            }
        }
        else
        {
            navigator.notification.alert(answer.error, function(){}, 'PromoZone', 'Ok');
        }    
    });
}*/