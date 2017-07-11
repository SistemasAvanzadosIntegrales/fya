function filtrar()
{
    if(estadoSeleccionado == null || estadoSeleccionado == '')
        navigator.notification.alert("Debe de seleccionar un estado a filtrar", function(){}, 'PromoZone', 'Ok');
    else
        refrescarListaPromociones(categoriaSeleccionada, 0);
}