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
/*
var doLogin = function(email, password) {
  var deffered = $q.defer();
  // the request parameters
  var loginRequest = {
    method: 'POST',
    url: 'http://buzcard.fr/identification.aspx?request=identification',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: function(obj) {
      var str = [];
      for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    },
    transformResponse: function(data) {
      var x2js = new X2JS();
      var json = x2js.xml_str2json(data);
      return json;
    },
    timeout: 4000,
    data: {
      email: email,
      hash: password
    }
  };
  // the HTTP request
  //  return $http(loginRequest);

  var myObject ={id: "", name:""};

  setTimeout(function () {
    deffered.resolve(myObject)
  }, 1000);

  return deffered.promise;
};
  */
