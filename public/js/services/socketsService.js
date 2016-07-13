angular
  .module('lifeLine')
  .service('SocketsService', SocketsService)

SocketsService.$inject = ['CurrentUser' , '$rootScope'];
function SocketsService(CurrentUser, $rootScope){

  var self = this;

  self.socket = io();

  self.onlineUsers = [];

  // $rootScope.$watch(function(){
  //   return self.onlineUsers;
  // }, function(newValue, oldValue){
  //    self.onlineUsers = newValue;
  // } , true);

  self.socket.on('onlineUser' , function(data){
      self.onlineUsers = data;
      $rootScope.$apply();
  });

  self.currentUser = CurrentUser.getUser();
  self.socket.emit('onlineUser' , self.currentUser);



  return self;

}
