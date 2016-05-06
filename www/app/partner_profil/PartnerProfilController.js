appContext.controller('PartnerProfilController', function ($scope, PartnerProfilService, localStorageService) {
  $scope.partnerNfo = [];
  PartnerProfilService.getNfo(localStorageService.get('token'))
    .success(function (data) {
      $scope.partnerNfo = JSON.parse(data.data);
      console.log($scope.partnerNfo.email);
    })
    .error(function (err) {

  });
});
