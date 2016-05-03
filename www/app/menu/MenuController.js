appContext.controller('MenuController', function($scope, $location){
    $scope.showMenuButton = function () {
      if ($location.path() == '/app/register' || $location.path() == '/app/login') {
        return false;
      } else {
        return true;
      }
    };
});
