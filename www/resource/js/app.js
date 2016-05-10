// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var appContext = angular.module('neemaa', ['ionic', 'ionic-toast', 'LocalStorageModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/menu/menu.html',
    controller: 'MenuController'
  })
  .state('startup', {
    url: '/startup',
    templateUrl: 'app/startup/startup.html',
    controller: 'StartupController'
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'app/home/home.html',
        controller: 'HomeController'
      }
    }
  })
  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'app/register/register.html',
        controller: 'RegisterController'
      }
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'app/login/login.html',
        controller: 'LoginController'
      }
    }
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'app/search/search.html',
        controller: 'SearchController'
      }
    }
  })
  .state('app.listSearch', {
    url: '/list',
    views: {
      'menuContent': {
        templateUrl: 'app/list/list.html',
        controller: 'ListController'
      }
    }
  })
  .state('app.partnerNfo', {
    url: '/partner-info',
    views: {
      'menuContent': {
        templateUrl: 'app/partner_nfo/partner_nfo.html',
        controller: 'PartnerNfoController'
      }
    }
  })
  .state('app.userProfil', {
    url: '/user_profil',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'app/user_profil/user_profil.html',
        controller: 'UserProfilController'
      }
    }
  })
  .state('app.partnerProfil', {
    url: '/partner_profil',
    views: {
      'menuContent': {
        templateUrl: 'app/partner_profil/partner_profil.html',
        controller: 'PartnerProfilController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/startup');
});
