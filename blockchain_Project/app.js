angular.element(document.body).ready(function () {
  angular.bootstrap(document.body, ['app'])
});

angular
  .module('app', [
    'ngRoute'
  ])
  .component('app', {
    templateUrl: 'app.html'
  })
  .config(routeConfig)
  .run(run);

function routeConfig($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode({enabled: false, requireBase: false});

  $routeProvider
    .when('/block', {template: '<block-page></block-page>', containerClass: 'container'})
    .when('/blockchain', {template: '<blockchain-page></blockchain-page>', containerClass: 'container-fluid'})
    .otherwise({redirectTo: '/blockchain'})
}

function run($location, $rootScope, $route) {
  var id = 0;
  $rootScope.difficulty = 4;
  $rootScope.$route = $route;

  $rootScope.sha256 = function (input) {
    return CryptoJS.SHA256(input).toString();
  };

  $rootScope.isActive = function (route) {
    return route === $location.path();
  };

  $rootScope.newId = function () {
    return (id++);
  };

  $rootScope.difficultyPrefix = function (difficulty) {
    var diff = difficulty || $rootScope.difficulty;
    var result = '';
    for (var i = 1; i <= diff; i++) {
      result += '0';
    }
    return result;
  };

  $rootScope.formatString = function (str) {
    var args = [].slice.call(arguments, 1),
      i = 0;

    return str.replace(/%s/g, function () {
      return args[i++];
    });
  };

  $rootScope.round =   function (number, digits) {
    var exp = Math.pow(10, digits);
    return (Math.round(number * exp) / exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\'');
  };
}
