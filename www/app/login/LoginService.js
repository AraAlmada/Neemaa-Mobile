appContext.factory('LoginService',function($http){
  return {
    login: function (user) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:8000/user/get/token',
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
