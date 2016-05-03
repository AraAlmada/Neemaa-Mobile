appContext.controller('UserProfilController',function($scope, UserProfilService){
  $scope.user = UserProfilService.getUser;
  $scope.user_profil = function (req) {
    console.log(req);
  }
});
