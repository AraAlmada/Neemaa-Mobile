appContext.controller('RegisterController',function($scope, ionicToast){
    $scope.register = function (req) {
      if (req.mail == undefined) {
        ionicToast.show('Remplir le champs Email', 'top', true, 2500);
      }
      if (req.password == undefined) {
        ionicToast.show('Mot de passe non défini', 'top', true, 2500);
      }
      if (req.password_confirm == undefined) {
        ionicToast.show('Il vous fai confirmer votre mot de passe', 'top', true, 2500);
      }
      if (req.password.length < 6) {
        ionicToast.show('Votre mot de passe doit contenir au moins 6 charactères', 'top', true, 2500);
      }
      if (req.password != req.password_confirm) {
        ionicToast.show('Les mot de passe ne corresponde pas !', 'top', true, 2500);
      }
    }
});
