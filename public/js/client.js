angular
  .module('logging', ['angular-jwt', 'ngResource', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  
MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./js/views/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "./js/views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "./js/views/authentications/register.html"
    })
    .state('users', {
      url: "/users",
      templateUrl: "./js/views/users/index.html"
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "./js/views/users/show.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    })
    .state('topics', {
      url: "/topics",
      templateUrl: "./js/views/topics/index.html"
    })
    .state('topic', {
      url: "/topics/:id",
      templateUrl: "./js/views/topics/show.html",
      controller: function($scope, $stateParams, Topic) {
        Topic.get({ id: $stateParams.id }, function(res){
          $scope.$parent.topics.topic = res.topic;
          // console.log($scope.$parent.topics.topic);
        });
      }
    })
    .state('newTopic', {
      url: "/topics",
      templateUrl: "./js/views/topics/new.html"
    })
    .state('chat', {
      url: "/chat",
      templateUrl: "./js/views/chat/chat.html"
    });

  $urlRouterProvider.otherwise("/");
}
