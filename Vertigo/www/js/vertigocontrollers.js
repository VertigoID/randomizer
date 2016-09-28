angular.module('vertigo.controllers', [])
/* Login service */
.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'user' && pw == 'secret') {
                deferred.resolve();
            } else {
                deferred.reject();
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.controller('LoginCtrl', function($scope, LoginService, $location, $ionicPopup, $state) {
    $scope.data = {};
	
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        })

		.success(function(data){
			var alertPopup = $ionicPopup.alert({
				title: 'Login Success!',
				template: 'Welcome ma man!',
			})
		})
		.error(function(data) {
               alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Salah username atau password boh!'
            });
        });
    }
})

/* FK IT, dont work on redirecting */
.controller('RegisterCtrl', function ($scope, $location) {

    $scope.register = function() {
      $location.path('/templates/register');
    };
  });



