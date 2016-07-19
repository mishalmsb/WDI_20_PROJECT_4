angular
  .module('lifeLine')
  .service('SocketsService', SocketsService)

SocketsService.$inject = ['CurrentUser' , '$rootScope'];
function SocketsService(CurrentUser, $rootScope){

  var self = this;

  self.socket = io();

  self.onlineUsers = [];
  self.message = "";

  self.sendMessege = function(msg) {
    self.socket.emit('chat message' , msg);
    // self.socket.emit('room', msg);
  }

  // $rootScope.$watch(function(){
  //   return self.onlineUsers;
  // }, function(newValue, oldValue){
  //    self.onlineUsers = newValue;
  // } , true);

  self.socket.on('onlineUser' , function(data){
      self.onlineUsers = data;
      $rootScope.$apply();
  });

  self.socket.on('chat message', function (data) {
    console.log(data);
    self.message = data;
    var chatEl = angular.element( document.querySelector( '#chatRoomText' ) );
    chatEl.append(data.user.local.username + " : " + data.message + '&#xA;');
  });

  self.socket.on('message', function(data) {
    console.log(data);
  });

  self.socket.on('disconnected', function() {
     self.socket.emit('offLine', "testhfghf");
 });

  self.currentUser = CurrentUser.getUser();
  self.socket.emit('onlineUser' , self.currentUser);

  return self;

}
