appContext.controller('UserProfilController',function($scope, UserProfilService, ionicToast, localStorageService,$state){
  $scope.user_profil = [];
  $scope.user_profile = UserProfilService.getSelectInfo;
  UserProfilService.getUser(localStorageService.get('token'))
    .success(function (data) {
      $scope.user_profil = JSON.parse(data.data);
  })
    .error(function (err) {
    console.log(err);
  });

  $scope.save_profil = function (user_profil) {

    console.warn(user_profil);

    if(user_profil.partner){
      localStorageService.set('isPartner',true);
    }
    UserProfilService.saveUser(user_profil, localStorageService.get('token'))
      .success(function (data) {
        ionicToast.show('Votre profil à bien été mise à jour', 'top', false,3000);
          $state.go('app.search');
    })
      .error(function (err) {
        console.log(err);
    });
  }
});
