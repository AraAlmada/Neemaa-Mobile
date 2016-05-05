appContext.controller('LoginController',function($scope, $window, localStorageService, ionicToast, LoginService, LoadingService, $rootScope,$ionicLoading){
  $scope.resendMail = function (user) {
    alert('ok');
  };
$scope.user=[];
  $scope.login = function (user) {

    var validation = true;
    if( !user){
      ionicToast.show('Merci de remplir tout les champs', 'top', false, 2500);
      validation = false;
    }else if (user.email == undefined || !validateEmail(user.email)) {
      ionicToast.show('Email incorrect', 'top', false, 2500);
      validation = false;
    }
    else if (! user.password) {
      ionicToast.show('Mot de passe  incorrect', 'top', false, 2500);
      validation = false;
    }
    else if (user.password.length < 6) {
      ionicToast.show('Mot de passe  incorrect', 'top', false, 2500);
      validation = false;
    }
    if (validation) {
      $ionicLoading.show();
      LoginService.login(user)
        .success(function (data) {
          if(data.response == 'NOK') {
            $ionicLoading.hide();
            ionicToast.show('Le format de l\'email est inscorrect', 'top', false, 2500);
          }
          if (data.response == 'wrong_pass') {
            $ionicLoading.hide();
            ionicToast.show('Le mot de passe semble incorrect', 'top', false, 2500);
          }
          if(data.response == 'user_does_not_exist') {
            $ionicLoading.hide();
            ionicToast.show('L\'utilisateur n\'existe pas', 'top', false, 2500);
          }
          if(data.response == 'NOT_ENABLED') {
            $ionicLoading.hide();
            $rootScope.email = user.email ;
              LoadingService.infoWithTreatment("Il vous faut activer votre compte, pour renvoyer un Email, taper sur le bouton","LoginController", "Renvoyer")

            }
          if (data.response == 'OK') {
            ionicToast.show('Bienvenue sur NEEMAA !', 'top', false, 2500);
            localStorageService.set('is_authenticate', true);
            localStorageService.set('token', data.data.token);
            $window.location.href = '#/app/search';
          }
        })
        .error(function (err) {
          error.log(err);
      });
    }
  };

  $scope.treatment = function(){
    console.warn($rootScope.email);
    LoginService.resendMail($rootScope.email,  localStorageService.get('token')).success(function(data, status, headers, config){
        if ("OK" == data.response) {
          $ionicLoading.hide();
            ionicToast.show('Un email vous a été envoyé', 'top', false, 2500);
        }
    }).error(function(data, status, headers, config){
        ionicToast.show('Une erreur est servenue', 'top', false, 2500);
    });
  }

  function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

});
