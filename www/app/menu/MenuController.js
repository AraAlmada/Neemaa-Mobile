appContext.controller('MenuController', function($scope, $location, $ionicSideMenuDelegate, MenuService, localStorageService){
  $scope.showMenuButton = function () {
    if ($location.path() == '/app/register' || $location.path() == '/app/login') {
      return false;
    } else {
      return true;
    }
  };

  $scope.isPartner = [];
  MenuService.checkIsPartner(localStorageService.get('token'))
  .success(function (data) {
    $scope.isPartner = JSON.parse(data.data);
    $scope.isPartner = $scope.isPartner.partner;
  });

  $scope.checkIsPartner = function () {
    if ($scope.isPartner) {
      return 1;
    } else {
      return 0;
    }
  };

  $scope.$on('$ionicView.enter', function(){
    $ionicSideMenuDelegate.canDragContent(false);
  });
  $scope.$on('$ionicView.leave', function(){
    $ionicSideMenuDelegate.canDragContent(false);
  });
});
