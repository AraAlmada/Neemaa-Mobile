appContext.factory('RegisterService', function ($http, ionicToast) {
  return {
    register: function (user) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:8000/user/create',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: user
      });
    }
  }
});
