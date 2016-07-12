angular
  .module('logging', ['angular-jwt', 'ngResource', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
.filter('online', function() {

  // Create the return function and set the required parameter name to **input**
  return function(input , onlineUsers) {

    var out = [];

    // Using the angular.forEach method, go through the array of data and perform the operation of figuring out if the language is statically or dynamically typed.
    angular.forEach(input, function(user) {

      if(onlineUsers.indexOf(user._id) !== -1) {
        out.push(user);
      }

    });

    return out;
  }

});

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./js/views/home.html",
      controller: "UsersController as users"
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
      templateUrl: "./js/views/users/index.html",
      controller: "UsersController as users"
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
      templateUrl: "./js/views/topics/index.html",
      controller: "TopicsController as topics"
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
