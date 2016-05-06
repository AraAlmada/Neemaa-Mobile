appContext.factory('LoginService',function($http){
  return {
    login: function (user) {
      return $http({
        method: 'POST',
        url: 'http://52.33.106.148/Neemaa-Back/web/app.php/user/get/token',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: user
      });
    },

    checkIsPartner: function (value) {
      return $http({
        method: 'POST',
        url: 'http://52.33.106.148/Neemaa-Back/web/app.php/api/user/get/profile?token=' + value,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {token: value}
      });
    },

    resendMail : function(email, token){
      var request = {
        method: 'POST',
        url: 'http://52.33.106.148/Neemaa-Back/web/app.php/user/send/'+encodeURIComponent(email),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data :{
          token : token,
        }
      }

      return $http(request);
    }
  }
});
