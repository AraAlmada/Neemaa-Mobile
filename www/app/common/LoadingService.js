appContext.factory('LoadingService',function($ionicLoading){


  var infoWithTreatment = function (msg,controller, btnLabel) {

	    $ionicLoading.show({
	      template: '<div class="window-info" ng-controller="'+controller+'"><p class="information-text">'+msg+'.</p><button class="btn-loading-text" ng-click="treatment()">'+btnLabel+'</button></div>',
	      animation: 'fade-in',
	      showBackdrop: true,
	    });

	  };

    return {
      infoWithTreatment : infoWithTreatment
    }
});
