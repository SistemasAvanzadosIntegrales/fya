var promozone = {};
$(document).ready(function(){
    //alert(screen.height);
    var aux =   screen.height;
    $('#fondo').css("height",(screen.height-110)+"px");
    $('#fondo2').css("height",(screen.height-180)+"px");
    if(aux>600 && aux<700){
          $('#fondo').css("margin-top","-370px");
         $('#fondo2').css("margin-top","-290px");
    }else if(aux>500 && aux<600){
         $('#fondo').css("margin-top","-350px");
         $('#fondo2').css("margin-top","-260px");
    }else if(aux>400 && aux<500){
         $('#fondo').css("margin-top","-360px");
         $('#fondo2').css("margin-top","-240px");
            $('#slc').css("margin-top","40px");
    }else if(aux>700){
         $('#fondo2').css("margin-top","-400px");
            $('#slc').css("margin-top","80px");
    }
});
promozone.isLogged = function() {
    if(localStorage.getItem('promozone') !== null)
    {
        var registro = JSON.parse(localStorage.getItem('promozone'));
        if(registro.ntok !== undefined && registro.ntok != null)
        {
            globalToken = registro.ntok;
            $(".srcMain").once('keyup', function(){
                globalFiltros = this.value;
            });
            $(".lmFavorito").once('click', function(){
                refrescarListaFavoritos();
            });
            $.mobile.changePage($("#estados"), "slide", true, true);
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
};

promozone.loggin = function(token) {
    try
    {
        $("#loading").hide();
        $("#lngusuario, #lngclave").val("");
        localStorage.setItem('promozone', JSON.stringify({ 'ntok': token }));
        globalToken = token;
        $(".srcMain").once('keyup', function(){
            globalFiltros = this.value;
        });
        $(".lmFavorito").once('click', function(){
            refrescarListaFavoritos();
        });
        $.mobile.changePage($("#estados"), "slide", true, true);
    }
    catch(error)
    {
        return false;
    }
};

promozone.deleteToken = function() {
    try
    {
        localStorage.removeItem('promozone');
        mainView.router.loadPage('index.html');
    }
    catch(error)
    {
        return false;
    }
};