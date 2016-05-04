appContext.controller('StartupController', function($window, localStorageService){
  if (localStorageService.get('is_authenticate') === true) {
    $window.location.href = '#/app/search';
  } else {
    $window.location.href = '#/app/register';
  }
});
