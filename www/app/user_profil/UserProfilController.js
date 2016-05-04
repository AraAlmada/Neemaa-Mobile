appContext.controller('UserProfilController',function($scope, UserProfilService, localStorageService){
  $scope.user_profil = [];
  UserProfilService.getUser(localStorageService.get('token'))
    .success(function (data) {
      $scope.user_profil = JSON.parse(data.data);
  })
    .error(function (err) {
    console.log(err);
  });
  $scope.save_profil = function (req) {
    alert(req.birthdate);
    UserProfilService.saveUser(req, localStorageService.get('token'))
      .success(function (data) {
        console.log(date);
    })
      .error(function (err) {
        console.log(err);
    });
  }
});
