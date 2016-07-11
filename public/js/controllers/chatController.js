angular
  .module('logging')
  .controller('ChatController', ChatController);

ChatController.$inject = ['CurrentUser', '$state', '$http', '$element'];
function ChatController(CurrentUser, $state, $http, $element){

  var self          = this;
  self.currentUser  = null;
  self.chat         = "";
  self.currentUser  = CurrentUser.getUser();

  self.onlineUsers  = null;
  self.sendMessege = function() {
      self.currentUser  = CurrentUser.getUser();
      socket.emit('chat message', self.chat);
  }

  var socket = io();

  socket.on('chat message' , function(message){
    var myEl = angular.element( document.querySelector( '#chatRoom' ) );
    myEl.append(self.currentUser.local.username + " : " + message+'<br/>');
  });

  return self;
}
