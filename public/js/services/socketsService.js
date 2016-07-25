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
    self.message = data;
    // chatName
    // var chatEl = angular.element( document.querySelector( '#chatMsg' ) );
    // chatEl.append(data.user.local.username + " : " + data.message + '&#xA;');

    var chatEl = angular.element( document.querySelector( '#chatMsg' ) );

    var newMsg = "<h5 class='media-heading'>" + data.user.local.username + 
                 "</h5>" + "<small class='col-lg-10'>" + data.message + "</small> <br>"  

    chatEl.append(newMsg); 

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
