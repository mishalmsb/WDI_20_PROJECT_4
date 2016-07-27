  angular
  .module('lifeLine')
  .controller('ChatController', ChatController);

ChatController.$inject = ['SocketsService', 'CurrentUser', '$state', '$http', '$element', '$mdDialog', '$scope'];
function ChatController(SocketsService, CurrentUser, $state, $http, $element, $mdDialog, $scope){

  var self          = this;


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
