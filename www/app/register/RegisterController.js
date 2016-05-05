appContext.controller('RegisterController',function($scope, $state, ionicToast, RegisterService){
    $scope.register = function (user) {
      console.warn(user);
      var validation = true;

      if (!user) {
        ionicToast.show('Merci de remplir le formulaire', 'top', false, 2500);
        validation = false;
      }
      else if( ! user.email ||  !validateEmail(user.email) ){
        ionicToast.show('Format de l\'Email incorrect', 'top', false, 2500);
        validation = false;
      }
      else if (! user.password  ) {
        ionicToast.show('Mot de passe incorrect', 'top', false, 2500);
        validation = false;
      }
      else if (user.password.length < 6 ) {
        ionicToast.show('Votre mot de passe doit contenir au moins 6 charactères', 'top', false, 2500);
        validation = false;
      }
      else if (!user.password_confirm) {
        ionicToast.show('Merci de confirmer votre mot de passe', 'top', false, 2500);
        validation = false;
      }
      else if (user.password_confirm != user.password ) {
        ionicToast.show('Les mot de passe ne corresponde pas !', 'top', false, 2500);
        validation = false;
      }



      if (validation) {
        RegisterService.register(user).success(function (data) {
          if (data.response == 'already_exist') {
            ionicToast.show('Cet email existe déjà', 'top', false, 2500);
          }
          if (data.response == 'NOK') {
            ionicToast.show('Une erreur est survenue', 'top', false, 2500);
          }
          if (data.response == 'OK') {
            ionicToast.show('Un Email vous à été envoyé', 'top', false, 2500);
            $state.go("app.login");
          }
          delete user.email;
          delete user.password;
          delete user.password_confirm;
        });
      }

    }

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
});
