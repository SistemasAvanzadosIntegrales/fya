$(document).on('pageshow', '#listafavoritos', function(){

});

function refrescarListaFavoritos(categoria, cercanos)
{
    if(estadoSeleccionado == null)
        navigator.notification.alert("Seleccione un estado", function(){}, 'PromoZone', 'Ok');
    else
        listaFavoritos();    
}

function listaFavoritos()
{
    $("#tituloCategoriaFavorito").html("Todas las categorias");
    
    window.location.hash = "#listafavoritos";
    $("#loading").show();
    categoriaSeleccionada = categoriaSeleccionada;
    try
    {
        var rutaWebService = 'http://promo-zone.com.mx/webservices/obtenerfavoritos.php?callback=?';
        $.getJSON( rutaWebService, { filtro: globalFiltros, token: globalToken })
        .done(function(answer) {
            if(answer.error === undefined)
            {
                if(answer.promocion !== undefined)
                {
                    try
                    {
                        $('#listadofavoritos').html('');
                        for(var i=0; i <= parseInt(answer.size); i++)
                        {
                            var promocion = answer.promocion[i];
                            $('#listadofavoritos').append('<div id="listado" onClick="javascript:detalle(' + promocion.id_promocion + ',' + promocion.id_sucursal + ')"><div class="divimg"><img src="http://promo-zone.com.mx/' + promocion.logo + '" width="100%" height="100%"/></div><div class="data"><div class="titulo" style="padding: 0.3em; font-size: 0.9em;"><strong>' + promocion.establecimiento + '</strong></div><div class="desc" style="color: #da3839 !important; padding-left: 0.7em; font-size: 0.9em !important;">' + promocion.promocion + '</div></div><div class="arrow"></div></div>');
                        }
                        $("#loading").hide();
                    }
                    catch(err)
                    {
                        navigator.notification.alert("Por favor intente de nuevo: " + err.message, function(){}, 'F&A', 'Ok');
                        $("#loading").hide();
                    }
                }
                else if(answer.size !== undefined)
                {
                    navigator.notification.alert("No hay promociones disponibles", function(){}, 'F&A', 'Ok');
                    $("#loading").hide();
                }
                else
                {
                    navigator.notification.alert(answer.message, function(){}, 'F&A', 'Ok');
                    $("#loading").hide();
                }
            }
            else
            {
                navigator.notification.alert(answer.error, function(){}, 'F&A', 'Ok');
                $("#loading").hide();
            }    
        });
    }
    catch(err)
    {
        navigator.notification.alert("Por favor intente de nuevo: " + err.message, function(){}, 'F&A', 'Ok');
        $("#loading").hide();
    }
}