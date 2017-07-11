$(document).on('pageshow', '#descripcionpromocion', function(){
    $("#loading").show();
    try
    {
        var rutaWebService = 'http://promo-zone.com.mx/webservices/obtEstablecimiento.php?callback=?';
        //alert(promoSelect);
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
                        $("#descLogo").html('<img src="http://promo-zone.com.mx/' + promocion.logo + '" width="300px" style="vertical-align: middle;"/>');
                        
                        var imagenes = promocion.imagen.split("||");
                        $("#galeria_promocion").html('');
                        for(var i = 0; i < imagenes.length; i++)
                        {
                            $("#galeria_promocion").html($("#galeria_promocion").html() + '<li><img src="http://promo-zone.com.mx/' + imagenes[i] + '" width="100%" style="vertical-align: middle;"/></li>');
                        }
                        
                        $("#descProm").html(promocion.promocion);
                        $("#descEstab").html(promocion.descripcion);
                        $("#descMap").once('click', function(){
                            abrirMapa(promocion.lat, promocion.lon);
                        });
                        
                        if(parseInt(promocion.destacado) == 1)
                        {
                            $("#dpahead").removeClass("fa-star-o").addClass("fa-check-circle");
                            $("#dpahead").attr("onClick", "quitarFavorito()");
                            $("#lblahead").html("Quitar de favoritos");
                        }
                        else
                        {
                            $("#dpahead").removeClass("fa-check-circle").addClass("fa-star-o");
                            $("#dpahead").attr("onClick", "anadirFavorito()");
                            $("#lblahead").html("Añadir a favoritos");
                        }
                        
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
                        navigator.notification.alert("Ha ocurrido un error: " + err.message, function(){}, 'F&A', 'Ok');
                    }
                }
                else if(answer.size !== undefined)
                {
                    navigator.notification.alert("No hay promociones disponibles", function(){}, 'F&A', 'Ok');
                }
                else
                {
                    navigator.notification.alert(answer.message, function(){}, 'F&A', 'Ok');
                }
            }
            else
            {
                navigator.notification.alert(answer.error, function(){}, 'F&A', 'Ok');
            }    
        });
    }
    catch(err)
    {
        navigator.notification.alert("Ha ocurrido un error: " + err.message, function(){}, 'F&A', 'Ok');
    }
});

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
                navigator.notification.alert(answer.anadido, function(){}, 'F&A', 'Ok');
            }
            else
            {
                navigator.notification.alert(answer.message, function(){}, 'F&A', 'Ok');
            }
        }
        else
        {
            navigator.notification.alert(answer.error, function(){}, 'F&A', 'Ok');
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
                navigator.notification.alert(answer.eliminado, function(){}, 'F&A', 'Ok');
            }
            else
            {
                navigator.notification.alert(answer.message, function(){}, 'F&A', 'Ok');
            }
        }
        else
        {
            navigator.notification.alert(answer.error, function(){}, 'F&A', 'Ok');
        }    
    });
}