angular.module('vertigo', ['ionic', 'vertigo.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
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

  //login page
    .state('login', {
		url: '/login',
		templateUrl: 'templates/login.html',
		controller: 'LoginCtrl'
  })
  
  //register page
	.state('register', {
		url:'/register',
		templateUrl:"templates/register.html",
		controller:"RegisterCtrl"
		})

  $urlRouterProvider.otherwise('/login');

});
