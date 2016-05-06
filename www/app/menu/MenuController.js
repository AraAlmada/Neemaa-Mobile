appContext.controller('MenuController', function($scope, $location, $ionicSideMenuDelegate){
  $scope.showMenuButton = function () {
    if ($location.path() == '/app/register' || $location.path() == '/app/login') {
      return false;
    } else {
      return true;
    }
  };

  $scope.$on('$ionicView.enter', function(){
    $ionicSideMenuDelegate.canDragContent(false);
  });
  $scope.$on('$ionicView.leave', function(){
    $ionicSideMenuDelegate.canDragContent(false);
  });
});
