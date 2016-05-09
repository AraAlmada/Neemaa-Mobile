appContext.controller('RegisterController',function($scope, $state, ionicToast, RegisterService,$rootScope,localStorageService){
    $scope.register = function (user) {
      console.warn(user);
      var validation = true;

      if (!user) {
        ionicToast.show('Merci de remplir le formulaire', 'top', false, 5000);
        validation = false;
      }
      else if( ! user.email ||  !validateEmail(user.email) ){
        ionicToast.show('Format de l\'Email incorrect', 'top', false, 5000);
        validation = false;
      }
      else if (! user.password  ) {
        ionicToast.show('Mot de passe incorrect', 'top', false, 5000);
        validation = false;
      }
      else if (user.password.length < 6 ) {
        ionicToast.show('Votre mot de passe doit contenir au moins 6 charactères', 'top', false, 5000);
        validation = false;
      }
      else if (!user.password_confirm) {
        ionicToast.show('Merci de confirmer votre mot de passe', 'top', false, 5000);
        validation = false;
      }
      else if (user.password_confirm != user.password ) {
        ionicToast.show('Les mot de passe ne corresponde pas !', 'top', false, 5000);
        validation = false;
      }
      if(user.partner){
        localStorageService.set('isPartner', true);
      }




      if (validation) {
        RegisterService.register(user).success(function (data) {
          if (data.response == 'already_exist') {
            ionicToast.show('Cet email existe déjà', 'top', false, 5000);
          }
          if (data.response == 'NOK') {
            ionicToast.show('Une erreur est survenue', 'top', false, 5000);
          }
          if (data.response == 'OK') {
            ionicToast.show('Un Email vous à été envoyé', 'top', false, 5000);
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
    //on focus
         $scope.focus = function() {
           $rootScope.focused = true;
         };
         //on blr
         $scope.blur = function() {
           $rootScope.focused = false;
         };
});
