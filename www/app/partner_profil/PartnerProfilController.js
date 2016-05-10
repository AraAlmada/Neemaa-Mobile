appContext.controller('PartnerProfilController', function ($scope, PartnerProfilService, localStorageService,$state) {
  $scope.partnerNfo = [];
  PartnerProfilService.getNfo(localStorageService.get('token'))
    .success(function (data) {
      $scope.partnerNfo = JSON.parse(data.data);
      console.log($scope.partnerNfo.email);
    })
    .error(function (err) {

  });

  $scope.save_profilPatner = function(profil){
    $state.go('app.search');
  }
});
