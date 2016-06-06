angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicSideMenuDelegate, localStorageService) {

  $scope.$on('$ionicView.enter', function(){
    $ionicSideMenuDelegate.canDragContent(false);
  });
  $scope.$on('$ionicView.leave', function(){
    $ionicSideMenuDelegate.canDragContent(false);
  });

  $scope.logout = function () {
    localStorageService.clearAll();
    $ionicSideMenuDelegate.toggleRight(false);
    $state.go('app.login');
  };

  $scope.ifAuth = function () {
    if (localStorageService.get('auth') && localStorageService.get('auth') == true) {
      return false;
    } else {
      return true;
    }
  };

  $scope.ifNeemStyler = function () {
    if (localStorageService.get('auth') && localStorageService.get('auth') == true && localStorageService.get('role') == 'neemstyler' ) {
      return true;
    } else {
      return false;
    }
  };

  $scope.ifUser = function () {
    if (localStorageService.get('auth') && localStorageService.get('auth') == true && localStorageService.get('role') == 'user' ) {
      return true;
    } else {
      return false;
    }
  };

  $scope.ifAdmin = function () {
    if (localStorageService.get('auth') && localStorageService.get('auth') == true && localStorageService.get('role') == 'admin' ) {
      return true;
    } else {
      return false;
    }
  }

})

.controller('AdminCtrl', function($scope, $state, $ionicSideMenuDelegate, localStorageService) {

    console.log('admin');

})

.controller('RegisterCtrl', function($scope, $state, ionicToast, RegisterService) {
  var ifSociety = false, registerNeemStyler = false;

  $scope.registerUser = function (user) {
    if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(user.email)) {
      ionicToast.show('Votre email semble incorrect', 'top', false, 2500);
      delete user.email;
    } else if(!user.password) {
      ionicToast.show('Renseignez votre mot de passe S.V.P', 'top', false, 2500);
    } else if(!user.password) {
      ionicToast.show('Confirmer votre mot de passe S.V.P', 'top', false, 2500);
    } else if(user.password.length <= 5 || user.password.length >= 20) {
      ionicToast.show('Votre mot de passe doit être compris entre 6 et 20 caracthere', 'top', false, 2500);
    } else if (user.password != user.password_confirmation) {
      ionicToast.show('Les mot de passes ne correspondent pas', 'top', false, 2500);
    } else if (ifSociety) {
      if (!user.society) {
        ionicToast.show('Renseignez votre société S.V.P', 'top', false, 2500);
      }
      RegisterService.register(user)
        .success(function () {
          delete user.society;
          ionicToast.show('Un email vous à été envoyé', 'top', false, 2500);
          $state.go('app.login');
        })
        .error(function (err) {
          ionicToast.show('Une erreur inconnue d\'est produite', 'top', false, 2500);
        });
    } else {
      RegisterService.register(user)
        .success(function () {
          ionicToast.show('Un email vous à été envoyé', 'top', false, 2500);
          $state.go('app.login');
      })
        .error(function (err) {
          ionicToast.show('Une erreur inconnue d\'est produite', 'top', false, 2500);
        });
    }
  };

  $scope.neemStyler = function () {
    if (ifSociety) {
      ifSociety = false;
    } else {
      ifSociety = true;
    }
  };

  $scope.ifNeemStyler = function () {
    return ifSociety;
  }
})

.controller('LoginCtrl', function($scope, $state, ionicToast, localStorageService, LoginService) {
  var validLoginButton = true;
  $scope.loginUser = function (user) {
    if (validLoginButton) {
      validLoginButton = false;
      if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(user.email)) {
        ionicToast.show('L\'email semble incorrect', 'top', false, 2500);
      } else if (user.password.length <= 5 || user.password.length >= 20) {
        ionicToast.show('Votre mot de passe doit être compris entre 6 et 20 caracthere', 'top', false, 2500);
      } else {
        LoginService.login(user)
          .success(function (data) {
            if (data.data === 'user_logged') {
              localStorageService.clearAll();
              localStorageService.set('email', user.email);
              localStorageService.set('token', data.token);
              localStorageService.set('auth', true);
              localStorageService.set('role', 'user');
              $state.go('app.search');
            } else if (data.data === 'admin_logged') {
              localStorageService.clearAll();
              localStorageService.set('email', user.email);
              localStorageService.set('token', data.token);
              localStorageService.set('auth', true);
              localStorageService.set('role', 'admin');
              $state.go('app.admin');
            }  else {
              localStorageService.clearAll();
              localStorageService.set('email', user.email);
              localStorageService.set('token', data.token);
              localStorageService.set('auth', true);
              localStorageService.set('role', 'neemstyler');
              $state.go('app.profilNeemStyler');
            }
            validLoginButton = true;
          })
          .error(function (err) {
            if (err.error == 'user_not_valide') {
              ionicToast.show('Confirmer votre compte par email, pour renvoyer, cliquer <a target="_blank" href="http://localhost:8000/api/resend/' + err.email + '">ici</a>', 'top', false, 6000);
            } else if (err.error == 'neemstyler_not_valide') {
              ionicToast.show('Confirmer votre compte par email, pour renvoyer, cliquer <a target="_blank" href="http://localhost:8000/api/resend/' + err.email + '">ici</a>', 'top', false, 6000);
            }  else {
              ionicToast.show('Utilisateurs non reconnue', 'top', false, 2500);
              delete user.email;
              delete user.password;
            }
            validLoginButton = true;
          });
      }
    }
  };
})

.controller('SearchCtrl', function($scope, $state, ionicToast, ServiceNeemStylerService, SearchService, localStorageService) {
  $scope.searchF = {};
  $scope.searchService = {};

  setTimeout(function () {
    ServiceNeemStylerService.getAllService(localStorageService.get('email'), localStorageService.get('token'))
      .success(function (data) {
        localStorageService.set('token', data.token);
        localStorageService.set('auth', true);
        $scope.searchService = data.response;
      })
  }, 1000);

  $scope.searchForm = function (searchF) {
    if (!searchF) {
      ionicToast.show('Remplir le formulaire', 'top', false, 4000);
    } else if (!searchF.cp || searchF.cp.length != 2) {
      ionicToast.show('Le code postal semble incorrect', 'top', false, 4000);
    } else if (!searchF.service) {
      ionicToast.show('Spécifier un service', 'top', false, 4000);
    } else {
      localStorageService.set('search.cp', searchF.cp);
      localStorageService.set('search.service', searchF.service);
      $state.transitionTo('app.list', {reload: true});
    }
  }
})

.controller('RecoveryCtrl', function ($scope, $state, ionicToast, RecoveryPasswordService) {
  $scope.recoveryPassword = function (user) {
    if (!user) {
      ionicToast.show('Renseignez votre email S.V.P', 'top', false, 2500);
    } else if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(user.email)) {
      ionicToast.show('Votre Email semble incorrect', 'top', false, 2500);
    } else {
      RecoveryPasswordService.recoveryPassword(user)
        .success(function (data) {

      })
        .error(function (err) {

      });
    }
  }
})

.controller('ProfilUserCtrl', function ($scope, $state, $ionicModal, Upload, ProfilUserService, localStorageService, ionicToast) {
  var select = document.getElementById('profil-select-color'), female = false, male = false, chargPage = true;

  $scope.showLoadingPanelUser = function() {
    return chargPage;
  };

  select.onchange = function () {
    select.className = this.options[this.selectedIndex].className;
  };

  $scope.isCheckedFemale = function () {
    return female;
  };

  $scope.isCheckedMale = function () {
    return male;
  };

  $scope.profilUserCheckboxFemale = function () {
    female = true;
    male = false;
  };

  $scope.profilUserCheckboxMale = function () {
    female = false;
    male = true;
  };

  $scope.userProfilePicture = 'http://localhost:8000/img/client/' + localStorageService.get('email') + '/profil.jpg';

  setTimeout(function () {
    ProfilUserService.getUser(localStorageService.get('email'), localStorageService.get('token'))
      .success(function (data) {
        localStorageService.set('token', data.token);
        localStorageService.set('auth', true);
        var date = data.response[0].birthdate.split(' ');
        data.response[0].birthdate = new Date(date[0]);
        if (data.response[0].sex == 'm') {
          male = true;
        } else if (data.response[0].sex == 'f') {
          female = true;
        }
        $scope.updateProfilUserN = data.response[0];
        chargPage = false;
      })
      .error(function () {
        ionicToast.show('Une erreur est survenue', 'top', false, 4000);
        chargPage = false;
        $state.go('app.login');
      });
  }, 1000);

  $scope.updateProfilUser = function (user) {
    if (female) {
      user.sex = 'f';
    } else if (male) {
      user.sex = 'm';
    }
    if (!user.firstname) {
      ionicToast.show('Indiquer votre prénom SVP', 'top', false, 4000);
    } else if (!user.lastname) {
      ionicToast.show('Indiquer votre nom SVP', 'top', false, 4000);
    } else if (!user.email) {
      ionicToast.show('Indiquer votre email SVP', 'top', false, 4000);
    } else if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(user.email)) {
      ionicToast.show('Le format de votre email semble incorrect', 'top', false, 4000);
      delete user.email;
    } else if (user.telephone && user.telephone.length != 10) {
      ionicToast.show('Le téléphone semble incorrect', 'top', false, 4000);
      delete user.telephone;
    } else if (user.cp && user.cp.length != 5) {
      ionicToast.show('Le code postal semble incorrect', 'top', false, 4000);
      delete user.cp;
    } else {
      if (user.neemstyler) {
        ProfilUserService.updateUserToNeemstyler(localStorageService.get('email'), localStorageService.get('token'), user)
          .success(function (data) {
            localStorageService.clearAll();
            ionicToast.show('Votre profil à été mis à jour vers neemstyler', 'top', false, 4000);
            $state.go('app.login');
          })
          .error(function () {
            console.log(err);
          });
      } else {
        ProfilUserService.updateUser(localStorageService.get('email'), localStorageService.get('token'), user)
          .success(function (data) {
            localStorageService.set('token', data.token);
            localStorageService.set('auth', true);
            ionicToast.show('Votre profil à été mis à jour', 'top', false, 4000);
            $state.go('app.profil');
          })
          .error(function (err) {
            console.log(err);
          })
      }
    }
  };

  $scope.uploadProfilePictureUser = function (file) {
    if (file.type == 'image/jpeg') {
      Upload.upload({
        url: 'http://localhost:8000/api/upload-profil-picture-user',
        data: {
          file: file,
          email: localStorageService.get('email')
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `${localStorageService.get('email')}token:${localStorageService.get('token')}`
        }})
        .then(function (data) {
          localStorageService.set('token', data.data.token);
          localStorageService.set('auth', true);
          ionicToast.show('Votre photo à été mise à jour', 'top', false, 4000);
          $scope.userProfilePicture = 'img/wait.gif';
          setTimeout(function() {
            $scope.userProfilePicture = 'http://localhost:8000/img/client/' + localStorageService.get('email') + '/profil.jpg?lastmod=' + new Date();
          }, 1000);
        });
    } else {
      ionicToast.show('Votre photo doit être au format JPEG', 'top', false, 4000);
    }
  };
})

.controller('ProfilNeemStylerCtrl', function ($scope, $state, ProfilNeemStylerService, Upload, ServiceNeemStylerService, ionicToast, localStorageService) {
  var home = 0, saloon = 0, picturePresente = false, id_neem;

  $scope.picturePresenteNeem = function () {
    return picturePresente;
  };

  $scope.ifCheckedHome = function () {
    return home;
  };

  $scope.ifCheckedSaloon = function () {
    return saloon;
  };

  $scope.checkHome = function () {
    if (home) {
      home = 0;
    } else {
      home = 1;
    }
  };

  $scope.checkSaloon = function () {
    if (saloon) {
      saloon = 0;
    } else {
      saloon = 1;
    }
  };

  $scope.servicesNeem = {};

  $scope.neemstylerProfilPicture = 'http://localhost:8000/img/neemstyler/' + localStorageService.get('email') + '/profil.jpg';

  setTimeout(function () {
    ProfilNeemStylerService.getNeemStyler(localStorageService.get('email'), localStorageService.get('token'))
      .success(function (data) {
        id_neem = data.response[0].id;
        localStorageService.set('id_neem', data.response[0].id);
        if (data.response[0].home == 1) {
          home = 1;
        }
        if (data.response[0].saloon == 1) {
          saloon = 1;
        }
        localStorageService.set('token', data.token);
        localStorageService.set('auth', true);
        $scope.updateProfilNeemStyler = data.response[0];
        if (data.picture_presente.length != 0) {
          picturePresente = true;
          $scope.updateProfilNeemStyler.image = data.picture_presente;
        }
      })
      .error(function (err) {
        console.log(err);
      });
  }, 1000);

  setTimeout(function () {
    ServiceNeemStylerService.getServiceNeem(localStorageService.get('email'), localStorageService.get('token'), localStorageService.get('id_neem'))
      .success(function (data) {
        $scope.servicesNeem = data.response;
        localStorageService.set('token', data.token);
        localStorageService.set('auth', true);
    })
      .error(function (err) {
        localStorageService.set('token', err.token);
        localStorageService.set('auth', true);
      });
  }, 2000);

  $scope.updateProfilNeemStylerN = function (user) {
    if (user.home == true) {
      user.home1 = home;
    }
    if (user.saloon == true) {
      user.saloon1 = saloon;
    }
    ProfilNeemStylerService.updateNeemStyler(localStorageService.get('email'), localStorageService.get('token'), user)
      .success(function (data) {
        localStorageService.set('token', data.token);
        localStorageService.set('auth', true);
        ionicToast.show('Votre profil a bien ete mis a jour', 'top', false, 4000);
        $state.go('app.profilNeemStyler');
      })
      .error(function (err) {
        console.log(err);
      });
  };

  $scope.neemStylerAddService = function (service) {
    if (!service) {
      ionicToast.show('Remplir les champs s\'il vous plait', 'top', false, 4000);
    } else if (!service.service) {
      ionicToast.show('Remplir un service S\'il vous pait', 'top', false, 4000);
    } else if (!service.price) {
      ionicToast.show('Indiquer un prix pour ce seervice', 'top', false, 4000);
    } else {
      service.id = id_neem;
      ServiceNeemStylerService.addService(localStorageService.get('email'), localStorageService.get('token'), service)
        .success(function (data) {
          localStorageService.set('token', data.token);
          localStorageService.set('auth', true);
          ionicToast.show('Le service à bien été ajouté', 'top', false, 4000);
          ServiceNeemStylerService.getServiceNeem(localStorageService.get('email'), localStorageService.get('token'), localStorageService.get('id_neem'))
            .success(function (data) {
              $scope.servicesNeem = data.response;
              localStorageService.set('token', data.token);
              localStorageService.set('auth', true);
            })
            .error(function (err) {
              localStorageService.set('token', err.token);
              localStorageService.set('auth', true);
            });
        })
        .error(function (err) {
          localStorageService.set('token', err.token);
          localStorageService.set('auth', true);
          ionicToast.show('Une erreur est survenue', 'top', false, 4000);
        });
    }
  };

  $scope.deleteService = function (serviceId) {
    ServiceNeemStylerService.deleteServiceNeem(localStorageService.get('email'), localStorageService.get('token'), serviceId)
      .success(function (data) {
        localStorageService.set('token', data.token);
        localStorageService.set('auth', true);
        ServiceNeemStylerService.getServiceNeem(localStorageService.get('email'), localStorageService.get('token'), localStorageService.get('id_neem'))
          .success(function (data) {
            $scope.servicesNeem = data.response;
            localStorageService.set('token', data.token);
            localStorageService.set('auth', true);
          })
          .error(function (err) {
            localStorageService.set('token', err.token);
            localStorageService.set('auth', true);
          });
      })
      .error(function (err) {
        localStorageService.set('token', err.token);
        localStorageService.set('auth', true);
      })
  };

  $scope.uploadProfilePictureNeemStyler = function (file) {
    if (file.type == 'image/jpeg') {
      Upload.upload({
        url: 'http://localhost:8000/api/upload-profil-picture-neemstyler',
        data: {
          file: file,
          email: localStorageService.get('email')
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `${localStorageService.get('email')}token:${localStorageService.get('token')}`
        }})
        .then(function (data) {
          localStorageService.set('token', data.data.token);
          localStorageService.set('auth', true);
          ionicToast.show('Votre photo à été mise à jour', 'top', false, 4000);
          $scope.neemstylerProfilPicture = 'img/wait.gif';
          setTimeout(function() {
            $scope.neemstylerProfilPicture = 'http://localhost:8000/img/neemstyler/' + localStorageService.get('email') + '/profil.jpg?lastmod=' + new Date();
          }, 1000);
        });
    } else {
      ionicToast.show('Votre photo doit être au format JPEG', 'top', false, 4000);
    }
  };

  $scope.uploadPictureNeemPresente = function (files) {
    Upload.upload({
      url: 'http://localhost:8000/api/upload-profil-picture-neemstyler-presente',
      data: {
        file: files,
        email: localStorageService.get('email')
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `${localStorageService.get('email')}token:${localStorageService.get('token')}`
      }})
      .then(function (data) {
        localStorageService.set('token', data.data.token);
        localStorageService.set('auth', true);
        ionicToast.show('Votre photo à été mise à jour', 'top', false, 4000);
        $scope.updateProfilNeemStyler.image = ['img/wait.gif'];
        setTimeout(function() {
          $scope.updateProfilNeemStyler.image = data.data.response;
        }, 1000);
        picturePresente = true;
      });
  }
})

.controller('ListCtrl', function ($scope, $state, SearchService, localStorageService, ionicToast) {
  var search = {
    'cp': localStorageService.get('search.cp'),
    'service': localStorageService.get('search.service')
  };
  setTimeout(function () {
    SearchService.getNeemStylers(localStorageService.get('email'), localStorageService.get('token'), search)
      .success(function (data) {
        localStorageService.set('token', data.token);
        localStorageService.set('auth', true);
        $scope.listNeemstyler = data.response;
        $scope.listNeemstyler.cp = search.cp;
      })
      .error(function (err) {
        localStorageService.set('token', err.token);
        localStorageService.set('auth', true);
        ionicToast.show('Aucun prestataire trouvé', 'top', false, 4000);
        console.log(err);
        $state.go('app.search');
      });
  }, 1000);

  $scope.neemStylerSelected = function (society) {
    SearchService.getNeemstyler(localStorageService.get('email'), localStorageService.get('token'), society)
      .success(function (data) {
        localStorageService.set('token', data.token);
        localStorageService.set('auth', true);
        localStorageService.set('search.neem.selected', data.response[0]);
        $state.go('app.neemstyler-info');
      })
      .error(function (err) {
        console.log(err);
      })
  };
})

.controller('InfoNeemStylerCtrl', function ($scope, $state, ionicToast, localStorageService) {
  $scope.neemSelected = localStorageService.get('search.neem.selected');

  $scope.neemSelectedHome = function () {
    if ($scope.neemSelected.home) {
      return true;
    }
  };

  $scope.neemSelectedSaloon = function () {
    if ($scope.neemSelected.saloon) {
      return true;
    }
  };
})

.controller('AgendaNeemStylerCtrl', function ($scope, $state, ionicToast, localStorageService, GoogleAgendaService) {
  setTimeout(function() {
    GoogleAgendaService.getNfo(localStorageService.get('email'), localStorageService.get('token'))
    .success(function(data) {
      localStorageService.set('token', data.token);
      localStorageService.set('auth', true);
      console.log(data);
    });
  }, 1000);
});
