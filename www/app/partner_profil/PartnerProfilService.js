appContext.factory('PartnerProfilService', function ($http) {
  return {
    getNfo: function (value) {
      return $http({
        method: 'POST',
        url: 'http://dev.neemaa.com/api/user/get/profile?token=' + value,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {token: value}
      });
    }
  }
});
