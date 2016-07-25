  angular
  .module('lifeLine')
  .controller('ChatController', ChatController);

ChatController.$inject = ['SocketsService', 'CurrentUser', '$state', '$http', '$element', '$mdDialog'];
function ChatController(SocketsService, CurrentUser, $state, $http, $element, $mdDialog){

  var self          = this;
  self.currentUser  = null;
  self.chat         = "";
  self.currentUser  = CurrentUser.getUser();
  self.helpingUser  = null;
  self.onlineUsers  = null;

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

  return self;
}
