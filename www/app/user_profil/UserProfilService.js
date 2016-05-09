appContext.factory('UserProfilService',function($http){
  return {
    getSelectInfo: {
      'SkinType': [
        'Normal',
        'Sèche',
        'Mixte',
        'Grasse',
        'Grasse à tendance acnéique',
        'Hyper pigmentée'
      ],
      'SkinColor': [
        '#fbd3d1',
        '#f2b8ad',
        '#edc192',
        '#d9ae7b',
        '#C0946F',
        '#9C6C44',
        '#7F553D',
        '#674230',
        '#4A2F24',
        '#3C1F0F',
        '#2E2520'
      ],
      'HairType': [
        'Cheveux raide',
        'Ondulé',
        'Bouclés-frisé',
        'Crépus'
      ],
      'HairColor': [
        'Noir',
        'Châtain foncée',
        'Châtain',
        'Châtain clair',
        'Blond foncée',
        'Blond clair',
        'Blond trés clair',
        'Roux'
      ]
    },
    getUser: function (value) {
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
    saveUser: function (user, token) {

      return $http({
        method: 'POST',
        url: 'http://52.33.106.148/Neemaa-Back/web/app.php/api/user/update/profile?token=' + token,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          phone : user.phone,
          sex: user.sex,
          code_postal : user.code_postal,
          birthdate: user.birthdate,
          skin_type: user.SkinType,
          skin_color: user.SkinColor,
          hair_type: user.HairType,
          hair_color: user.HairColor,
          is_partner : user.partner,
          token: token
        }
      });
    }
  }
});
