var filtro_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

$(document).on('pageshow', '#ingreso', function(){
    //promozone.deleteToken();
    $("#sesion").once('click', function(){
        if(dispositivo != null)
        {
            loginUsuario();
        }
        else
            navigator.notification.alert("El dispositivo no es soportado por la aplicación", function(){}, 'F&A', 'Ok');
    });
    
    promozone.isLogged();
    estados2();
});

function salir()
{
    promozone.deleteToken();
    window.location.hash = "#ingreso";
}
/*
function loginUsuario(){
    try{
          var rutaWebService = 'http://promo-zone.com.mx/webservices/ingresoapp.php';
        alert("Entro");
        $.ajax({
            method: 'POST',
            url:rutaWebService,
            data: {
                 usuario: $('#lngusuario').val().trim(), 
                 clave: $('#lngclave').val().trim()
            },
            processData: true,
            dataType: "json",
                success: function(answer) {
                    alert(answer);
                    alert(answer.ntok);
                    if(answer.error === undefined)
                    {

                        if(answer.ntok !== undefined)
                        {
                            try
                            {

                                promozone.loggin(answer.ntok);
                                alert("Esta logeado");
                            }
                            catch(err)
                            {
                                navigator.notification.alert("Ha ocurrido un error al hacer login: " + err.message, function(){}, 'PromoZone', 'Ok');
                                $("#loading").hide();
                            }
                        }
                        else
                        {
                            navigator.notification.alert(answer.message, function(){}, 'PromoZone2', 'Ok');
                            $("#loading").hide();
                        }
                        }
                    },
                    error: function(answer) {
                      navigator.notification.alert("Ha ocurrido un error al hacer login: " + err.message, function(){}, 'PromoZone', 'Ok');
                    $("#loading").hide();
        }

                });
         
    }catch(err){
        alert(err);
    }
}*/

function loginUsuario()
{
    
    try
    {
        if($('#lngusuario').val().trim() != '' && $('#lngclave').val().trim() != '')
        {
            if(filtro_email.test($('#lngusuario').val().trim()))
            {
                var rutaWebService = 'http://promo-zone.com.mx/webservices/ingresoapp.php?callback=?';
             //alert(rutaWebService);
                $.getJSON( rutaWebService, { usuario: $('#lngusuario').val().trim(), clave: $('#lngclave').val().trim() })
                .done(function(answer) {
                    if(answer.error === undefined)
                    {
                         
                        if(answer.ntok !== undefined)
                        {
                            try
                            {
                               
                                promozone.loggin(answer.ntok);
                                //alert("Esta logeado");
                            }
                            catch(err)
                            {
                                navigator.notification.alert("Ha ocurrido un error al hacer login: " + err.message, function(){}, 'F&A', 'Ok');
                                $("#loading").hide();
                            }
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
            else
            {
                navigator.notification.alert("Ingrese un correo valido", function(){}, 'F&A', 'Ok');
            }
        }
        else
            navigator.notification.alert("Ingrese usuario y contraseña", function(){}, 'F&A', 'Ok');
    }
    catch(err)
    {
        navigator.notification.alert("Ha ocurrido un error al hacer login: " + err.message, function(){}, 'F&A', 'Ok');
        $("#loading").hide();
    }
}  

function registrarUsuario()
{
    //alert($('#restado').val());
    try
    {
        if($('#regnombre').val().trim() != '' && $('#regusuario').val().trim() != '' && $('#regclave').val().trim() != '')
        {
            if(filtro_email.test($('#regusuario').val().trim()))
            {
                var rutaWebService = 'http://promo-zone.com.mx/webservices/registroapp2.php?callback=?';
                $.getJSON( rutaWebService, { nombre: $('#regnombre').val().trim(), usuario: $('#regusuario').val().trim(), clave: $('#regclave').val().trim(), estado: $('#restado').val() })
                .done(function(answer) {
                    $("#loading").hide();
                    if(answer.error === undefined)
                    {
                        if(answer.ok !== undefined)
                        {
                            navigator.notification.alert(answer.ok, function(){}, 'F&A', 'Ok');
                            window.location.hash = "#ingreso";
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
            else
            {
                navigator.notification.alert("Ingrese un correo valido", function(){}, 'F&A', 'Ok');
            }
        }
        else
        {
            navigator.notification.alert('Ingrese los datos requeridos', function(){}, 'F&A', 'Ok');
        }
    }
    catch(err)
    {
        navigator.notification.alert("Ha ocurrido un error al registrar: " + err.message, function(){}, 'F&A', 'Ok');
    }
}

function estados2(){
     archivoValidacion = 'http://promo-zone.com.mx/webservices/obtenerestados.php?callback=?';
        $.getJSON(archivoValidacion, function(answer) { 
            $("#loading").hide();
            if(answer.error === undefined)
            {
                if(answer.html !== undefined)
                {
                    try
                    {
                        $('#restado').append(answer.html);
                       
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
                            navigator.notification.alert("Ha ocurrido un error al registrar: " + err.message, function(){}, 'F&A', 'Ok');
                        }
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
        else
            navigator.notification.alert("El login con Facebook no ha sido posible, intentelo nuevamente", function(){}, 'F&A', 'Ok');
    }
    catch(err)
    {
        navigator.notification.alert("Ha ocurrido un error al registrar: " + err.message, function(){}, 'F&A', 'Ok');
    }
}

function cancelarRegistro(){
    $("#regnombre, #regusuario, #regclave").val("");
    window.location.hash='ingreso';
}