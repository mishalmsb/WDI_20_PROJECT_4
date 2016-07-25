  angular
  .module('lifeLine')
  .controller('ChatController', ChatController);

ChatController.$inject = ['SocketsService', 'CurrentUser', '$state', '$http', '$element', '$mdDialog', '$scope'];
function ChatController(SocketsService, CurrentUser, $state, $http, $element, $mdDialog, $scope){

  var self          = this;
  self.currentUser  = null;
  self.chat         = "";
  self.currentUser  = CurrentUser.getUser();
  self.helpingUser  = null;
  self.onlineUsers   = SocketsService.onlineUsers;

  $scope.$watch(function(){ return SocketsService.onlineUsers }, function(newVal){
      self.onlineUsers = newVal;
  } , true);

  self.sendMessege = function() {
    self.currentUser  = CurrentUser.getUser();
    var newMessage = {
      user:     self.currentUser,
      message:  self.chat,
      room:     "room1"
    };
    SocketsService.sendMessege(newMessage);
    self.chat = "";
  }

  angular.element(document).ready(function () {

    console.log(SocketsService.onlineUsers);

  });

  

  return self;
}
