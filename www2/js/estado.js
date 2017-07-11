$(document).on('pageshow', '#estados', function(){
    
    $('#select-state').html('');
    $('#select-state').append('<option value="0">Seleccione un estado</option>');
    $("#loading").show();
    try
    {
        
        archivoValidacion = 'http://promo-zone.com.mx/webservices/obtenerestados.php?callback=?';
        $.getJSON(archivoValidacion, function(answer) { 
           // alert("Entro")
            $("#loading").hide();
            if(answer.error === undefined)
            {
                if(answer.html !== undefined)
                {
                    try
                    {
                        $('#select-state').append(answer.html);
                        $('#select-state').change(function() {
                            if(parseInt($("#select-state").val()) > 0)
                            {
                                estadoSeleccionado = parseInt($("#select-state").val());
                                municipios($("#select-state").val());
                                //refrescarListaPromociones(categoriaSeleccionada, 0);
                                //alert("Paso");
                            }
                        });
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
    catch(err)
    {
        navigator.notification.alert("Por favor intente de nuevo: " + err.message, function(){}, 'F&A', 'Ok');
        $("#loading").hide();
    }
});

function cambiarEstado()
{
    reinicia();
    window.location.hash="#estados";
}



 function cambiarMun(){
            municipioSeleccionado = $('#select-muni').val();
             //alert(municipioSeleccionado);
            refrescarListaPromociones(categoriaSeleccionada, 0);
}
function municipios(estado){
     var rutaWebService = 'http://promo-zone.com.mx/webservices/municipios.php?callback=?';
                $.getJSON( rutaWebService, { estado: estado })
                .done(function(answer) {
                    if(answer.error === undefined)
                    {
                        $('#select-muni option').remove();
                       $('#select-muni').append(answer.html);
                        
                    }
                    else
                    {
                        navigator.notification.alert(answer.error, function(){},
'F&A', 'Ok');
                        $("#loading").hide();
                    }    
                });
}
