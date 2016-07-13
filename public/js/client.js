angular
  .module('lifeLine', ['angular-jwt', 'ngResource', 'ui.router', 'ngMaterial', 'ngMdIcons'])
  .constant('API', 'http://localhost:3000/api')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
