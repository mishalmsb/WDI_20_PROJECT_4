angular
  .module('lifeLine')
  .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: "/",
        templateUrl: "./js/views/authentications/login.html",
        controller: function(CurrentUser,$state) {
          if (CurrentUser.getUser()) {
            $state.go('home');
          };
        }
      })
      .state('home', {
        url: "/home",
        templateUrl: "./js/views/home.html",
        controller: "UsersController as users", 
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
      // .state('topics', {
      //   url: "/topics",
      //   templateUrl: "./js/views/topics/index.html",
      //   controller: "TopicsController as topics"
      // })
      // .state('topic', {
      //   url: "/topics/:id",
      //   templateUrl: "./js/views/topics/show.html",
      //   controller: function($scope, $stateParams, Topic) {
      //     Topic.get({ id: $stateParams.id }, function(res){
      //       $scope.$parent.topics.topic = res.topic;
      //       // console.log($scope.$parent.topics.topic);
      //     });
      //   }
      // })
      // .state('newTopic', {
      //   url: "/topics",
      //   templateUrl: "./js/views/topics/new.html"
      // })
      .state('chat', {
        url: "/chat",
        templateUrl: "./js/views/chat/chat.html",
        controller: "ChatController as chat"
      });

    $urlRouterProvider.otherwise("/");
  }
