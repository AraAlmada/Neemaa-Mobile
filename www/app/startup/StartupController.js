appContext.controller('StartupController', function($window, localStorageService){
  if (localStorageService.get('is_authenticate') === true) {
    $window.location.href = '#/app/home';
  } else {
    $window.location.href = '#/app/register';
  }
});
