appContext.controller('RegisterController',function($scope, $window, ionicToast, RegisterService){
    $scope.register = function (req) {
      var validation = true;
      if (req.email == undefined) {
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
        RegisterService.register(req).success(function (data) {
          if (data.response == 'already_exist') {
            ionicToast.show('L\'Email existe déjà', 'top', true, 2500);
          }
          if (data.response == 'NOK') {
            ionicToast.show('Une erreur est survenue', 'top', true, 2500);
          }
          if (data.response == 'OK') {
            ionicToast.show('Un Email vous à été envoyé', 'top', true, 2500);
            $window.location.href = '#/app/login';
          }
          delete req.email;
          delete req.password;
          delete req.password_confirm;
        });
      }
    }
});
