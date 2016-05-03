appContext.controller('PartnerProfilController', function ($scope, PartnerProfilService) {
  $scope.partnerNfo = PartnerProfilService.getNfo;
  console.log($scope.partnerNfo);
});
