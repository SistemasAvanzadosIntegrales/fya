$(document).on('pageshow', '#estados', function(){
    $('#select-state').html('');
    $('#select-state').append('<option value="0">Seleccione un estado</option>');
    $("#loading").show();
    try
    {
        //archivoValidacion = 'http://webservices.promo-zone.com.mx/obtenerestados.php?callback=?';
        archivoValidacion = 'http://api.promo-zone.com.mx/v1/estado';
        $.getJSON(archivoValidacion, function(answer) { 
            var cuantosEstados = answer.length;
            var html = '';
            
            console.log("Obteniendo "+answer.length+" estados");
            if(cuantosEstados>0){
                $.each(answer, function(key, estado){
                    html+='<option value="'+estado.id+'" seo="'+estado.seo_permalink+'">'+estado.estado+'</option>';
                    if(cuantosEstados==1){
                        try 
                            {
                                $('#select-state').append(html);
                                $('#select-state').change(function() {
                                    if(parseInt($("#select-state").val()) > 0)
                                    { 
                                        estadoSeleccionado = parseInt($("#select-state").val());
                                        estadoSeoPermalink = $("#select-state option:selected").attr("seo");
                                        console.log("El estado seleccionado es: "+estadoSeleccionado+" con el seo_permalink: "+estadoSeoPermalink);
                                        refrescarListaPromociones(categoriaSeleccionada, 0);
                                    }
                                });
                            }
                            catch(err)
                            {
                                navigator.notification.alert("Por favor intente de nuevo: " + err.message, function(){}, 'PromoZone', 'Ok');
                            }
                        $("#loading").hide();
                    }
                    cuantosEstados--;
                });
            }else{
                navigator.notification.alert("Por favor intente de nuevo: " + err.message, function(){}, 'PromoZone', 'Ok');
                $("#loading").hide();
            }
            
            
            /*$("#loading").hide();
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
                                refrescarListaPromociones(categoriaSeleccionada, 0);
                            }
                        });
                    }
                    catch(err)
                    {
                        navigator.notification.alert("Por favor intente de nuevo: " + err.message, function(){}, 'PromoZone', 'Ok');
                    }
                }
                else
                {
                    navigator.notification.alert(answer.message, function(){}, 'PromoZone', 'Ok');
                }
            }
            else
            {
                navigator.notification.alert("Por favor intente de nuevo: " + answer.error, function(){}, 'PromoZone', 'Ok');
            } */   
        });
    }
    catch(err)
    {
        navigator.notification.alert("Por favor intente de nuevo: " + err.message, function(){}, 'PromoZone', 'Ok');
        $("#loading").hide();
    }
});

function cambiarEstado()
{
    reinicia();
    window.location.hash="#estados";
}