appContext.controller('PartnerNfoController', function ($scope, PartnerNfoService) {
  $scope.partnerNfo = PartnerNfoService.getNfo;
  console.log($scope.partnerNfo.img);
});
