appContext.controller('SearchController',function($scope){
    $scope.search = function (req) {
        console.log(req.service);
    }
});
