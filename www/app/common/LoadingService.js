appContext.factory('LoadingService',function($ionicLoading){


  var infoWithTreatment = function (msg,controller, btnLabel) {

	    $ionicLoading.show({
	      template: '<div ng-controller="'+controller+'"><button class="button button-clear" style="line-height: normal;min-height: 0;min-width: 0;padding: 0;float: right;" ng-click="dismiss()"><i class="ion-close-circled"></i></button><div class="window-info" ><p class="information-text">'+msg+'.</p><button class="btn-loading-text" ng-click="treatment()">'+btnLabel+'</button></div></div>',
	      animation: 'fade-in',
	      showBackdrop: true,
	    });

	  };
    var dismiss = function() {
      console.log('dismiss');
    $ionicLoading.hide();
  };

    return {
      infoWithTreatment : infoWithTreatment,
      dismiss:dismiss
    }
});
