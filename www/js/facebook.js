 /* COMENTADO POR FER VILLARRUEL 
 var accessToken = null;
function login(){
    facebookConnectPlugin.login(
        ["public_profile", "email"], 
        function(userData){
            facebookConnectPlugin.getAccessToken(
                function(token) {
                    accessToken = token;
                    facebookConnectPlugin.api('/me?fields=name,email', null,
                    function(response) {
                        registrarUsuarioFacebook(response.name, response.email, accessToken);
                    });
                }, 
                function(error) {
                    navigator.notification.alert("No se ha podido sincronizar con Facebook" +
                                         "\n\nMensaje: " + error, function(){}, 'PromoZone', 'Ok');
                }
            );
        }, 
        function(error){
            navigator.notification.alert("No se ha podido sincronizar con Facebook" +
                                         "\n\nMensaje: " + error, function(){}, 'PromoZone', 'Ok');
        }
    );
}*/

/*angular.module("facebookApp", ["ionic", "ngCordova"]).controller("mainCtrl", ["$scope", "$cordovaOauth", "$http", function($scope, $cordovaOauth, $http) {
    window.cordovaOauth = $cordovaOauth;
    window.http = $http;
}]);
        
function login()
{
    facebookLogin(window.cordovaOauth, window.http);
}

function facebookLogin($cordovaOauth, $http)
{
    $cordovaOauth.facebook("888958317824726", ["email", "public_profile"], {redirect_uri: "http://localhost/callback"}).then(function(result){
        displayData($http, result.access_token);
    },  function(error){
            if(error !== "The sign in flow was canceled") navigator.notification.alert("No se ha podido sincronizar con Facebook", function(){}, 'PromoZone', 'Ok');
    });
}
        
function displayData($http, access_token)
{
    $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name,email,gender,location,picture", format: "json" }}).then(function(result) {
        //var name = result.data.name;
        //var gender = result.data.gender;
        //var picture = result.data.picture;
        //$.mobile.changePage($("#profile"), "slide", true, true);
        registrarUsuarioFacebook(result.data.name, result.data.email, result.data.id);
    }, function(error) {
        navigator.notification.alert("No se ha podido sincronizar con Facebook" + error, function(){}, 'PromoZone', 'Ok');
    });
}*/