appContext.controller('LoginController',function($scope, $location, ionicToast, LoginService){
  $scope.login = function (req) {
    var validation = true;
    if (req.mail == undefined) {
      ionicToast.show('L\'Email semble incorrect', 'top', true, 2500);
      validation = false;
    }
    if (req.password == undefined) {
      ionicToast.show('Mot de passe non défini', 'top', true, 2500);
      validation = false;
    }
    if (validation) {
      if (LoginService.login(req)) {
        // TODO test if user is activated
        // TODO Save the token in LocalStorage
        // TODO Update LocalStorage 'is Authenticate'
        $location.path('app/search');
      } else {
        ionicToast.show('L\'autentification à échoué !', 'top', true, 2500);
      }
    }
  }
});
