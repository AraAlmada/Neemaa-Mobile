appContext.controller('MenuController', function($scope, $location, $ionicSideMenuDelegate, MenuService, localStorageService){
  var userType= window.localStorage.getItem('typeProfile');

  $scope.showMenuButton = function () {
    if ($location.path() == '/app/register' || $location.path() == '/app/login') {
      return false;
    } else {
      return true;
    }
  };

  $scope.checkIsPartner = function () {
    console.log(localStorageService.get('isPartner'));
    if (localStorageService.get('isPartner')) {
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
