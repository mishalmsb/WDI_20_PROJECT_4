angular
  .module('lifeLine', ['ngMaterial', 'ngMdIcons', 'angular-jwt', 'ngResource', 'ui.router', 'ngMessages'])
  .constant('API', 'http://localhost:3000/api')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
