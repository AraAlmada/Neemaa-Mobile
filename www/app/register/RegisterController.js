appContext.controller('RegisterController',function($scope, ionicToast, RegisterService){
    $scope.register = function (req) {
      var validation = true;
      if (req.mail == undefined) {
        ionicToast.show('L\'Email semble incorrect', 'top', true, 2500);
        validation = false;
      }
      if (req.password == undefined) {
        ionicToast.show('Mot de passe non défini', 'top', true, 2500);
        validation = false;
      }
      if (req.password_confirm == undefined) {
        ionicToast.show('Il vous fai confirmer votre mot de passe', 'top', true, 2500);
        validation = false;
      }
      if (req.password.length < 6) {
        ionicToast.show('Votre mot de passe doit contenir au moins 6 charactères', 'top', true, 2500);
        validation = false;
      }
      if (req.password != req.password_confirm) {
        ionicToast.show('Les mot de passe ne corresponde pas !', 'top', true, 2500);
        validation = false;
      }
      if (validation) {
        if (RegisterService.register(req)) {
          // TODO Login user
          console.log(req.type);
        } else {
          ionicToast.show('L\'inscription à échoué !', 'top', true, 2500);
        }
      }
    }
});
