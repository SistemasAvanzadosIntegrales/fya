function filtrar()
{
    if(estadoSeleccionado == null || estadoSeleccionado == '')
        navigator.notification.alert("Debe de seleccionar un estado a filtrar", function(){}, 'F&A', 'Ok');
    else
        refrescarListaPromociones(categoriaSeleccionada, 0);
}