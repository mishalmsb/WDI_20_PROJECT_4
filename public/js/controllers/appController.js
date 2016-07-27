var app = angular.module('lifeLine');

app.controller('AppCtrl', ['$location', '$window', '$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', '$state', 'CurrentUser', function($location, $window, $scope, $mdBottomSheet, $mdSidenav, $mdDialog, $state, CurrentUser){

  var self      = this;
  self.socket   = io();

  self.currentUser = '';
  
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.logout = function() {
    self.socket.emit('logOut' , CurrentUser.getUser());
    CurrentUser.clearUser();

  };

  $scope.menu = [
    {
      link : 'home',
      title: 'Desktop',
      icon: 'person',
      video: 'true'
    },
    {
      link : 'chat',
      title: 'Chat Overflow',
      icon: 'message',
      video: 'false'
    }
  ];

  // $scope.alert = '';

  $scope.getName = function() {
    self.currentUser = CurrentUser.getUser();
    if (self.currentUser) {
      return self.currentUser.local.fullname;
    }
  }

  $scope.checkPage = function() {
    // console.log($location.path());
    if ($location.path() == "/home") {
      return true;
      console.log("chat")
    }
  }

  $scope.checkLoggedIn = function() {
    self.currentUser = CurrentUser.getUser();
    // if (!self.currentUser) {
    //   $state.go('login');
    // } 

    return !!self.currentUser;
  }

  $scope.homePage = function() {

    return !!self.currentUser;

  }
  
  return self;
}]);
