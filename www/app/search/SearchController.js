appContext.controller('SearchController',function($scope, $location, localStorageService, ionicToast, SearchService){
  $scope.serviceList = SearchService.getService();
  $scope.search = function (req) {
    var validation = true;
    if (!Number.isInteger(req.cp) && req.cp.length != 5) {
      ionicToast.show('Le code postal semble incorrect, example: 94100', 'top', true, 2500);
      validation = false;
    }
    if (req.service === undefined) {
      ionicToast.show('Indiquez un service SVP !', 'top', true, 2500);
      validation = false;
    }
    if (validation) {
      localStorageService.set('Search.cp', req.cp);
      localStorageService.set('Search.service', req.service);
      $location.path('app/list');
    }
  }
});
