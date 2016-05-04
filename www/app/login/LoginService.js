appContext.factory('LoginService',function($http){
  return {
    login: function (user) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1/neemaa/web/app_dev.php/user/get/token',
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

    resendMail : function(email){
      var request = {
        method: 'POST',
        url: 'http://127.0.0.1/neemaa/web/app_dev.php/user/send/'+encodeURIComponent(email),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data :{
          token :"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXUyJ9.eyJleHAiOjE0NjI0Mzc1MzEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOiIxNDYyMzUxMTMxIn0.knq4YLSJDDOj6JPXRFjLeUMg8injkLK67NVaeh0snlIIXefQx6tzsKsxoznGGENwm34CfT3TMTy2zGZo2eiKs_q58DmxR-Pp_vFKi_lcjb5dzGft5V4lzWGKi1O0csYiEFS3slzF5BXvKXlHCmsLHpuDPndzz5-YNajTWJyk_TNVyyvfmksntosppF5FHhEJyj-iy9l7a-z2JjVnDlko10CIQcLBLPJRiOUaeJFcdU7VzgVXJnw8VAE6NMke7XUHqyIaujL6tKSLkYsmZwDrmAaheo4Db4PgwIbd8sK7NWiBrix5tYixhR1cNWz3aUjvxqnnRrRd3asDPLOYg6qnQV5vSYaDKP8Q23eRIvUUXx__aj6nO5YLqwa-DXk-FjM_-kORcGtbh7RpMqQQT5D_PFxKPm0vScCswD7lubXTdmPpbdB3e-lEkx8m0mjVHxrpeYwOdrGzmIEbuUyNw0ulg34NuP-82jq9xDF6vVA3Gf_41XWwf-cMfotb7Uw6a0gOEyvE9PcI36A0R9VJgplAV1dYT-HQuLFa_pIyJ3dIXUQLi4bmlbVwzaJdgla-Jtm1SH--DIJOHzPlCKCXA8ZyDiBbjkWSBQVdtPXsTED42EWixl8ZA_XQrLe8OehwjmJFDq6BSVqL6m0O-3sdlmTdy20RD4IGBVb3vxQTrMigs0c",
        }
      }

      return $http(request);
    }
  }
});
