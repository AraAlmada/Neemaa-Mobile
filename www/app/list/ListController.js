appContext.controller('ListController',function($scope, ListService, $log){
  $scope.listPartner = ListService.getPartner;
});
