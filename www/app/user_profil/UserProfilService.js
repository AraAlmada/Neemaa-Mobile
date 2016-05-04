appContext.factory('UserProfilService',function($http){
  return {
    getUser: function (value) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/user/get/profile?token=' + value,
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
    saveUser: function (user, token) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/user/update/profile?token=' + token,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {
          first_name: user.firstname,
          last_name: user.lastname,
          sex: user.gender,
          code_postal: user.cp,
          birthdate: user.birthdate,
          skin_type: user.SkinType,
          skin_color: user.SkinColor,
          hair_type: user.HairType,
          hair_color: user.HairColor,
          token: token
        }
      });
    }
  }
});
