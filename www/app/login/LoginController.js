appContext.controller('LoginController',function($scope, $window, localStorageService, ionicToast, LoginService){
  $scope.resendMail = function (user) {
    alert('ok');
  };

  $scope.login = function (req) {
    var validation = true;
    if (req.email == undefined) {
      ionicToast.show('L\'Email semble incorrect', 'top', true, 2500);
      validation = false;
    }
    if (req.password == undefined) {
      ionicToast.show('Mot de passe non défini', 'top', true, 2500);
      validation = false;
    }
    if (validation) {
      LoginService.login(req)
        .success(function (data) {
          if(data.response == 'NOK') {
            ionicToast.show('Le format de l\'email est inscorrect', 'top', true, 2500);
          }
          if (data.response == 'wrong_pass') {
            ionicToast.show('Le mot de passe semble incorrect', 'top', true, 2500);
          }
          if(data.response == 'user_does_not_exist') {
            ionicToast.show('L\'utilisateur n\'existe pas', 'top', true, 2500);
          }
          if(data.response == 'NOT_ENABLED') {
            ionicToast.show('Il vous faut activer votre compte, pour renvoyer un Email, cliquer <a data-ng-click="resendMail(' + req.email + ')">ICI</a>', 'top', true, 2500);
          }
          if (data.response == 'OK') {
            ionicToast.show('Bienvenue sur NEEMAA !', 'top', true, 2500);
            localStorageService.set('is_authenticate', true);
            localStorageService.set('token', data.data.token);
            $window.location.href = '#/app/search';
          }
        })
        .error(function (err) {
          console.log(err);
      });
    }
  }
});
