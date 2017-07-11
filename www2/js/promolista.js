var int_categoria = null;
var int_cercanos = null;

$(document).on('pageshow', '#listapromociones', function(){
     $('#pestado').change(function() {
                            if(parseInt($("#select-state").val()) > 0)
                            {
                                estadoSeleccionado = parseInt($("#select-state").val());
                                refrescarListaPromociones(categoriaSeleccionada, 0);
                            }
                        });

});

function detalle(id_promo, id_sucursal)
{
    promoSelect = id_promo;
    sucursalSelect = id_sucursal;
    window.location.hash = "#descripcionpromocion";
}

function perfil(){
    window.location.hash = "#perfil";
    $("#pnombre").val("HOla");
    ver_perfil();
}

function refrescarListaPromociones(categoria, cercanos)
{
    int_categoria = categoria;
    int_cercanos = cercanos;
    if(cercanos == 1)
    {
        if(estadoSeleccionado != null && estadoSeleccionado > 0)
        {
            if(categoriaSeleccionada != null && categoriaSeleccionada > 0)
            {
                obtenerPosicion();
            }
            else
                navigator.notification.alert("Seleccione una categoria para realizar la busqueda", function(){}, 'F&A', 'Ok');
        }
        else
            navigator.notification.alert("Seleccione un estado para realizar la busqueda", function(){}, 'F&A', 'Ok');
    }
    else
    {
        listaPromociones();
    }
}

function listaPromociones()
{
    var titulo = "Listado";
    switch (parseInt(int_categoria))
    {
        case 1: titulo = "Listado de Tiendas & Departamentales"; break;
        case 2: titulo = "Listado de Bares & Restaurantes"; break;
        case 3: titulo = "Listado de Servicios varios"; break;
        case 4: titulo = "Listado de Hoteles & Posadas"; break;
        case 5: titulo = "Listado de entretenimientos"; break;
        default: titulo = "Listado";
    }
    
    cambiarColor(parseInt(int_categoria)-1);
    $("#tituloCategoria").html(titulo);
    
    window.location.hash = "#listapromociones";
    $("#loading").show();
    categoriaSeleccionada = int_categoria;
    try
    {
        var rutaWebService = 'http://promo-zone.com.mx/webservices/obtenerestablecimientos.php?callback=?';
        if($("#filt").val() !='') globalFiltros = $("#filt").val();
         if($("#filt2").val() !='') globalFiltros = $("#filt2").val();
         if($("#filt3").val() !='') globalFiltros = $("#filt3").val();
        if(globalFiltros == '' || globalFiltros == null) globalFiltros = 'notfilterset';
       
        //alert(globalFiltros);
        $.getJSON( rutaWebService, { estado: estadoSeleccionado,municipio:municipioSeleccionado, categoria: categoriaSeleccionada, filtro: globalFiltros, cercano: int_cercanos, lat: globalUbicacion.lat, lon: globalUbicacion.lon })
        .done(function(answer) {
            if(answer.error === undefined)
            {
                if(answer.promocion !== undefined)
                {
                    try
                    {
                        $('#listadoPromociones').html('');
                        for(var i=0; i <= parseInt(answer.size); i++)
                        {
                            $("#filt").val("");
                            $("#filt2").val("");
                            $("#filt3").val("");
                            globalFiltros = '';
                            var promocion = answer.promocion[i];
                            $('#listadoPromociones').append('<div id="listado" onClick="javascript:detalle(' + promocion.id_promocion + ',' + promocion.id_sucursal + ')"><div class="divimg"><img src="http://promo-zone.com.mx/' + promocion.logo + '" width="100%" height="100%"/></div><div class="data"><div class="titulo" style="padding: 0.3em; font-size: 0.9em;"><strong>' + promocion.establecimiento + '</strong></div><div class="desc" style="color: #da3839 !important; padding-left: 0.7em; font-size: 0.9em !important;">' + promocion.promocion + '</div></div><div class="arrow"></div></div>');
                        }
                        $("#loading").hide();
                    }
                    catch(err)
                    {
                        $('#listadoPromociones').html('');
                        navigator.notification.alert("Ha ocurrido un error: " + err.message, function(){}, 'F&A', 'Ok');
                        $("#loading").hide();
                    }
                }
                else if(answer.size !== undefined)
                {
                    $('#listadoPromociones').html('');
                    navigator.notification.alert("No hay promociones disponibles", function(){}, 'F&A', 'Ok');
                    $("#loading").hide();
                }
                else
                {
                    $('#listadoPromociones').html('');
                    navigator.notification.alert(answer.message, function(){}, 'F&A', 'Ok');
                    $("#loading").hide();
                }
            }
            else
            {
                $('#listadoPromociones').html('');
                navigator.notification.alert(answer.error, function(){}, 'F&A', 'Ok');
                $("#loading").hide();
            }    
        });
    }
    catch(err)
    {
        navigator.notification.alert("Ha ocurrido un error: " + err.message, function(){}, 'F&A', 'Ok');
        $("#loading").hide();
    }
}

function cambiarColor(posicion)
{
    for(var i = 0; i < categorias_arr.length; i++)
    {
        if(i == parseInt(posicion))
            $(".ct" + (i+1)).removeClass(categorias_arr[i]).addClass("fa-check-square");
        else
            $(".ct" + (i+1)).removeClass("fa-check-square").addClass(categorias_arr[i]);
    }
}

//MI PERFIL



function ver_perfil()
{
    try
    {
       var rutaWebService = 'http://promo-zone.com.mx/webservices/perfil.php?callback=?';
             //alert(globalToken);
                $.getJSON( rutaWebService, { funcion:1, id:globalToken })
                .done(function(answer) {
                    //alert(JSON.stringify(answer));
                    if(answer.error === undefined)
                    {
                         
                      try
                            {
                              $("#pnombre").val(answer.nombre);
                                $("#pcorreo").val(answer.correo);
                                $("#pclave").val(answer.password);
                                estados();
                                //alert($('#pestado').val());
                                $('#pestado').val(answer.estado).attr('selected', true);//val(answer.estado);
                            }
                            catch(err)
                            {
                                navigator.notification.alert("Ha ocurrido un error al hacer login: " + err.message, function(){}, 'F&A', 'Ok');
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
        navigator.notification.alert("Ha ocurrido un error al hacer login: " + err.message, function(){}, 'F&A', 'Ok');
        $("#loading").hide();
    }
}  

function estados(){
     archivoValidacion = 'http://promo-zone.com.mx/webservices/obtenerestados.php?callback=?';
        $.getJSON(archivoValidacion, function(answer) { 
            $("#loading").hide();
            if(answer.error === undefined)
            {
                if(answer.html !== undefined)
                {
                    try
                    {
                        $('#pestado').append(answer.html);
                       
                    }
                    catch(err)
                    {
                        navigator.notification.alert("Por favor intente de nuevo: " + err.message, function(){}, 'F&A', 'Ok');
                    }
                }
                else
                {
                    navigator.notification.alert(answer.message, function(){}, 'F&A', 'Ok');
                }
            }
            else
            {
                navigator.notification.alert("Por favor intente de nuevo: " + answer.error, function(){}, 'F&A', 'Ok');
            }    
        });
}

function editar_perfil()
{
    //alert($('#pestado').val());
    if( $('#politicas').prop('checked') ) {
    
         try
        {
           var rutaWebService = 'http://promo-zone.com.mx/webservices/perfil.php?callback=?';
                 //alert(globalToken);
                    $.getJSON( rutaWebService, { funcion: 2, id:globalToken, nombre: $("#pnombre").val(), correo: $("#pcorreo").val(),password: $("#pclave").val(), estado: $('#pestado').val()})
                    .done(function(answer) {
                       // alert(JSON.stringify(answer));
                        if(answer.error === undefined)
                        {

                          try
                                {
                                      navigator.notification.alert("Datos guardados correctamente.", function(){}, 'F&A', 'Ok');
                                    $("#loading").hide();
                                }
                                catch(err)
                                {
                                    navigator.notification.alert("Ha ocurrido un error al hacer login: " + err.message, function(){}, 'F&A', 'Ok');
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
            navigator.notification.alert("Ha ocurrido un error al hacer login: " + err.message, function(){}, 'F&A', 'Ok');
            $("#loading").hide();
        }
        
    }else{
         navigator.notification.alert("Debe aceptar las politicas de privacidad.", function(){}, 'F&A', 'Ok');
            $("#loading").hide();
    }
   
}  

