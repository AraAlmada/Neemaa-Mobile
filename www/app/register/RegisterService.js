appContext.factory('RegisterService', function ($http, ionicToast) {
  return {
    register: function (user) {
      return $http({
        method: 'POST',
        url: 'http://52.33.106.148/Neemaa-Back/web/app.php/user/create',
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
