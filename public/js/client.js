angular
  .module('lifeLine', ['ngMaterial', 'ngMdIcons', 'angular-jwt', 'ngResource', 'ui.router', 'ngMessages'])
  // .constant('API', 'https://localhost:3000/api')
  .constant('API', '/api')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://www.youtube.com/**'
    ]);
  });
