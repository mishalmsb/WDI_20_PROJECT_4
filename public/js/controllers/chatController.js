angular
  .module('logging')
  .controller('ChatController', ChatController);

ChatController.$inject = ['CurrentUser', '$state', '$http', '$element'];
function ChatController(CurrentUser, $state, $http, $element){

  var self          = this;
  self.currentUser  = null;
  self.chat         = "";
  self.currentUser  = CurrentUser.getUser();
  self.helpingUser  = null;
  self.onlineUsers  = null;
  self.sendMessege = function() {
      self.currentUser  = CurrentUser.getUser();
      var newMessage = {
        user:     self.currentUser._id,
        message:  self.chat
      }
      socket.emit('chat message', newMessage);

  }

  var socket = io();

  socket.on('chat message' , function(message){
    console.log(message);
    var chatEl = angular.element( document.querySelector( '#chatRoom' ) );
    chatEl.append(self.currentUser.local.username + " : " + message.message+'<br/>');
    var newTopicUser = angular.element( document.querySelector( '#newTopicUser' ) );
    if (message.user != self.currentUser._id ) {
      self.helpingUser = message.user;
    }
    newTopicUser.val(self.helpingUser);
  });

  return self;
}
