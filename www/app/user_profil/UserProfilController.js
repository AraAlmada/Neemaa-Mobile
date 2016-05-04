appContext.controller('UserProfilController',function($scope, UserProfilService, ionicToast, localStorageService){
  $scope.user_profil = [];
  $scope.user_profile = UserProfilService.getSelectInfo;
  UserProfilService.getUser(localStorageService.get('token'))
    .success(function (data) {
      $scope.user_profil = JSON.parse(data.data);
  })
    .error(function (err) {
    console.log(err);
  });
  $scope.save_profil = function (req) {
    UserProfilService.saveUser(req, localStorageService.get('token'))
      .success(function (data) {
        ionicToast.show('Votre profil à bien été mise à jour', 'top', true, 2500);
    })
      .error(function (err) {
        console.log(err);
    });
  }
});
