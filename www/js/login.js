
/*var filtro_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


$(document).on('pageshow', '#ingreso', function(){
$.mobile.changePage($("#estados"), "slide", true, true);
   COMENTADO POR FER VILLARRUEL   //promozone.deleteToken();
    $("#sesion").once('click', function(){
        if(dispositivo != null)
        {
            loginUsuario();
        }
        else
            navigator.notification.alert("El dispositivo no es soportado por la aplicación", function(){}, 'PromoZone', 'Ok');
    });
    
    promozone.isLogged();
});

/*COMENTADO POR FER VILLARRUEL 
function salir()
{
    promozone.deleteToken();
    window.location.hash = "#ingreso";
    
}

function loginUsuario()
{
    try
    {
        if($('#lngusuario').val().trim() != '' && $('#lngclave').val().trim() != '')
        {
            if(filtro_email.test($('#lngusuario').val().trim()))
            {
                var rutaWebService = 'http://promo-zone.com.mx/webservices/ingresoapp.php?callback=?';
                $.getJSON( rutaWebService, { usuario: $('#lngusuario').val().trim(), clave: $('#lngclave').val().trim() })
                .done(function(answer) {
                    if(answer.error === undefined)
                    {
                        if(answer.ntok !== undefined)
                        {
                            try
                            {
                                promozone.loggin(answer.ntok);
                            }
                            catch(err)
                            {
                                navigator.notification.alert("Ha ocurrido un error al hacer login: " + err.message, function(){}, 'PromoZone', 'Ok');
                                $("#loading").hide();
                            }
                        }
                        else
                        {
                            navigator.notification.alert(answer.message, function(){}, 'PromoZone', 'Ok');
                            $("#loading").hide();
                        }
                    }
                    else
                    {
                        navigator.notification.alert(answer.error, function(){}, 'PromoZone', 'Ok');
                        $("#loading").hide();
                    }    
                });
            }
            else
            {
                navigator.notification.alert("Ingrese un correo valido", function(){}, 'PromoZone', 'Ok');
            }
        }
        else
            navigator.notification.alert("Ingrese usuario y contraseña", function(){}, 'PromoZone', 'Ok');
    }
    catch(err)
    {
        navigator.notification.alert("Ha ocurrido un error al hacer login: " + err.message, function(){}, 'PromoZone', 'Ok');
        $("#loading").hide();
    }
}

function registrarUsuario()
{
    try
    {
        if($('#regnombre').val().trim() != '' && $('#regusuario').val().trim() != '' && $('#regclave').val().trim() != '')
        {
            if(filtro_email.test($('#regusuario').val().trim()))
            {
                var rutaWebService = 'http://promo-zone.com.mx/webservices/registroapp.php?callback=?';
                $.getJSON( rutaWebService, { nombre: $('#regnombre').val().trim(), usuario: $('#regusuario').val().trim(), clave: $('#regclave').val().trim() })
                .done(function(answer) {
                    $("#loading").hide();
                    if(answer.error === undefined)
                    {
                        if(answer.ok !== undefined)
                        {
                            navigator.notification.alert(answer.ok, function(){}, 'PromoZone', 'Ok');
                            window.location.hash = "#ingreso";
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
            else
            {
                navigator.notification.alert("Ingrese un correo valido", function(){}, 'PromoZone', 'Ok');
            }
        }
        else
        {
            navigator.notification.alert('Ingrese los datos requeridos', function(){}, 'PromoZone', 'Ok');
        }
    }
    catch(err)
    {
        navigator.notification.alert("Ha ocurrido un error al registrar: " + err.message, function(){}, 'PromoZone', 'Ok');
    }
}

function registrarUsuarioFacebook(nombre, email, idFacebook)
{
    try
    {
        if(nombre != '' && email != '' && idFacebook != '')
        {
            var rutaWebService = 'http://promo-zone.com.mx/webservices/registroappfacebook.php?callback=?';
            $.getJSON( rutaWebService, { nombre: nombre, usuario: email, clave: idFacebook })
            .done(function(answer) {
                if(answer.error === undefined)
                {
                    if(answer.ntok !== undefined)
                    {
                        try
                        {
                            promozone.loggin(answer.ntok);
                        }
                        catch(err)
                        {
                            navigator.notification.alert("Ha ocurrido un error al registrar: " + err.message, function(){}, 'PromoZone', 'Ok');
                        }
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
        else
            navigator.notification.alert("El login con Facebook no ha sido posible, intentelo nuevamente", function(){}, 'PromoZone', 'Ok');
    }
    catch(err)
    {
        navigator.notification.alert("Ha ocurrido un error al registrar: " + err.message, function(){}, 'PromoZone', 'Ok');
    }
}

function cancelarRegistro(){
    $("#regnombre, #regusuario, #regclave").val("");
    window.location.hash='ingreso';
}*/